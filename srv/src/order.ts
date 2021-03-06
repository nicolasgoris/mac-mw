import cds from "@sap/cds";
import { Request } from "@sap/cds/apis/services";
import { Authorisation } from "./helpers/authorisation";
import { getHIPInvoiceAxios, getHIPOrderAxios } from "./helpers/axios";
import { Order } from "./definitions/order";
import { hip } from "./hip/order";
import { OrderError, ErrorType } from "./helpers/error";

const RegEx = {
    status: {
        getFilter: /Status eq '([A-z]+)'/
    },
    invoice: {
        getId: /^.*\/(\d+.pdf)$/
    }
}

const STATUS_DELIVERED = 'Delivered';

class OrderService extends cds.ApplicationService {
    async init() {
        /* Only share live data for Customers since this can be updated on the fly */
        this.on("READ", "Customer", async (req: Request) => {
            try {
                // return [{ UserName: 'gorisni@cronos.be', SoldTo: '100171357', SoldToName: 'Cramo AS', SalesOrg: 'SE20' }];
                return await Authorisation.getAuthorisation().getCustomers(req);
            } catch (e) {
                if (e instanceof Error) {
                    const error: any = <any>e;
                    return req.reject(500, error.message, typeof error.cause === 'string' ? error.cause : error.cause.response.data.message);
                }
            }
            return;
        });
        // this.on("READ", "Status", async (req: Request) => {
        //     return [{ Status: 'Processing' }, { Status: 'Confirmed' }, { Status: 'Shipping' }, { Status: 'Invoiced' }, { Status: 'Complete' }, { Status: 'Cancelled' }];
        // })
        /* Retrieve the Order information beforehand, store it in the HANA db and use it for the response (read) */
        this.before("READ", "Order", async (req: Request) => {
            try {
                const { OrderNr } = req.data;
                /* Check if the request is for one order and if the user has access to retrieve that order */
                if (OrderNr) {
                    const order = await getOrderDetails(req, OrderNr);
                } else {
                    const status = getFilterStatus(req);
                    /* Check if the request for orders contains a status and if that status is for the history */
                    if (status && status === STATUS_DELIVERED) {
                        throw new OrderError(`You cannot request order history yet.`, 501, ErrorType.LOGIC, ''); // TODO This should call the order history API in the future
                    } else {
                        /* Retrieve the customers for which the user has access and is requesting */
                        const customers: Order.ICustomer[] = await Authorisation.getAuthorisation().retrieveAuthorisedCustoemrs(req);
                        if (customers.length > 0) {
                            const orders = await getOrderHeaders(req, customers);
                        } else {
                            throw new OrderError(`No customers were selected, please select at least one customer.`, 501, ErrorType.LOGIC, '');
                        }
                    }
                }
            } catch (error) {
                if (error instanceof OrderError) {
                    req.reject(error.code, error.message);
                } else {
                    req.reject(500, `Something went terrebly wrong, we don't know what though...`);
                };
            }
        });
        // this.on('getInvoice', async (req: Request) => {
        //     if (typeof req.params[1] === 'object') {
        //         return getInvoice(req, Order_OrderNr, InvoiceNr);
        //     }
        // });
        // this.on("READ", "Invoices", async (req: Request) => {
        //     const { Order_OrderNr, InvoiceNr } = (req.params[1]) as Order.IInvoice;
        //     console.log(`${Order_OrderNr} - ${InvoiceNr}`)
        //     if (Order_OrderNr && InvoiceNr) {
        //         return {
        //             value: await getInvoice(req, Order_OrderNr, InvoiceNr),
        //             '*@odata.mediaContentType': 'application/pdf'
        //         }
        //     }
        //     return true;
        // });
        await super.init();
    }
}

/* Methods for retrieving the orders for a customer */
const getOrderHeaders = async (req: Request, customers: Order.ICustomer[]) => {
    try {
        const customersToUpdate = await getCustomersToUpdate(customers);
        await updateOrderHeaders(req, customersToUpdate);
    } catch (error) {
        console.log(error.message);
    }
}
const updateOrderHeaders = async (req: Request, customers: Order.ICustomer[]) => {
    const orders = await getOrdersFromAPI(req, customers);
    await deleteOrderHeaders(req, customers);
    await insertOrderHeaders(req, customers, orders);
}
const getOrdersFromAPI = async (req: Request, customers: Order.ICustomer[]): Promise<Order.IOrder[]> => {
    let orders: Order.IOrder[] = [];
    for (let n = 0; n < customers.length; n++) {
        const customer = customers[n];
        try {
            const HIPOrderAxios = getHIPOrderAxios();
            const fromDate = new Date(new Date().setMonth(new Date().getMonth() - 6));
            const answer = await HIPOrderAxios<hip.IOrder[]>({
                method: 'GET',
                url: `/?soldTo=${customer.SoldTo}&salesOrg=${customer.SalesOrg}&fromDate=${fromDate.toISOString().split('T')[0]}&toDate=${(new Date()).toISOString().split('T')[0]}`,
                headers: {
                    'apikey': '36cbc92c8f5249fcbc346c4a37df4a36' // FIXME This should not be here
                }
            });
            orders = orders.concat(answer.data.map((o) => {
                return {
                    OrderNr: o.orderDocumentSAP,
                    OrderDate: new Date(o.orderDate),
                    Status: o.status,
                    CustomerReference: o.orderCustomerRef,
                    SalesOrg: customer.SalesOrg,
                    SoldTo: customer.SoldTo,
                    SoldToName: customer.SoldToName,
                    TotalAmount: o.totalValue,
                    TotalCurrency: o.currency
                }
            }));
        } catch (error) {
            if (error instanceof Error) {
                const e: Error = <any>error;
                throw new OrderError(`Retrieving data from HIP did not succeed for customer: ${customer.SoldToName}.`, 503, ErrorType.API, e.message);
            }
        }
    }
    return orders;
}
const deleteOrderHeaders = async (req: Request, customers: Order.ICustomer[]) => {
    try {
        const db = await cds.connect.to('db');
        await db.tx(req).run(DELETE.from(db.entities[Order.Entity.Orders]).where(createWhereStatement(customers)));
    } catch (error) {
        if (error instanceof Error) {
            const e: Error = <any>error;
            throw new OrderError(`Deleting the order headers for certain customers did not succeed`, 500, ErrorType.HANA, e.message);
        }
    }
}
const insertOrderHeaders = async (req: Request, customers: Order.ICustomer[], orders: Order.IOrder[]) => {
    try {
        const db = await cds.connect.to('db');
        await db.tx(req).run(INSERT.into(db.entities[Order.Entity.Orders]).entries(orders));
    } catch (error) {
        if (error instanceof Error) {
            const e: Error = <any>error;
            throw new OrderError(`Inserting the order headers for certain customers did not succeed`, 500, ErrorType.HANA, e.message); // FIXME customers??
        }
    }
}

/* Methods for retrieving a specific Order */
const getOrderDetails = async (req: Request, OrderNumber: string) => {
    // const db = await cds.connect.to('db');
    // let yesterday = (new Date(new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString();
    // const order: Order.IOrder = await cds.run(SELECT.one.from(db.entities[Order.Entity.Orders]).where(
    //     { OrderNr: OrderNumber, LastModified: { '>=': yesterday } }).columns('OrderNr'));
    // if (!order) {
    await updateOrderDetails(req, OrderNumber);
    // }
}
const updateOrderDetails = async (req: Request, orderNr: string) => {
    const hipOrder = await getOrderDetailsFromAPI(req, orderNr),
        soldToId: string = hipOrder?.addresses ? hipOrder?.addresses.soldTo.id : '',
        customer = await Authorisation.getAuthorisation().checkOrderIsAllowed(req, soldToId);
    if (hipOrder && customer) {
        const order = await enrichWithInvoices(transformToDetails(hipOrder, customer));
        // await deleteOrderDetails(req, orderNr);
        await insertOrderDetails(req, orderNr, order);
    }
}
const getOrderDetailsFromAPI = async (req: Request, orderNr: string): Promise<hip.IOrderDetails | undefined> => {
    try {
        const HIPOrderAxios = getHIPOrderAxios();
        return (await HIPOrderAxios<hip.IOrderDetails>({
            method: 'GET',
            url: `/${orderNr}`,
            headers: {
                'apikey': '36cbc92c8f5249fcbc346c4a37df4a36' // FIXME This should not be here
            }
        })).data;
    } catch (error) {
        if (error instanceof Error) {
            const e: Error = <any>error;
            throw new OrderError(`Retrieving the details for the order: ${orderNr} did not succeed`, 503, ErrorType.API, e.message);
        }
    }
    return;
}
const deleteOrderDetails = async (req: Request, orderNr: string) => {
    // try {
    //     const db = await cds.connect.to('db');
    //     await db.tx(req).run(DELETE.from(db.entities[Order.Entity.Invoices]).where({ OrderNr: orderNr }));
    //     await db.tx(req).run(DELETE.from(db.entities[Order.Entity.DeliveryItems]).where({ OrderNr: orderNr }));
    //     await db.tx(req).run(DELETE.from(db.entities[Order.Entity.Deliveries]).where({ OrderNr: orderNr }));
    //     await db.tx(req).run(DELETE.from(db.entities[Order.Entity.LineItems]).where({ OrderNr: orderNr }));
    //     // await db.tx(req).run(DELETE.from(db.entities[Order.Entity.OrderDetails]).where({ OrderNr: orderNr }));
    // } catch (error) {
    //     if (error instanceof Error) {
    //         const e: Error = <any>error;
    //         throw new OrderError(`Deleting the order details for ${orderNr} did not succeed`, 500, ErrorType.HANA, e.message);
    //     }
    // }
}
const insertOrderDetails = async (req: Request, orderNr: string, order: Order.IOrder) => {
    try {
        const db = await cds.connect.to('db');
        // if (order.Invoices) await db.tx(req).run(INSERT.into(db.entities[Order.Entity.Invoices]).entries(order.Invoices));
        // const items = order.Deliveries?.map(d => d.Items).flat();
        // if (items) await db.tx(req).run(INSERT.into(db.entities[Order.Entity.DeliveryItems]).entries(items));
        // if (order.Deliveries) await db.tx(req).run(INSERT.into(db.entities[Order.Entity.Deliveries]).entries(order.Deliveries.map(o => { delete o.Items; return o; })));
        // if (order.LineItems) await db.tx(req).run(INSERT.into(db.entities[Order.Entity.LineItems]).entries(order.LineItems));
        // delete order.Invoices; 
        // delete order.LineItems;
        // delete order.Deliveries;
        await db.tx(req).run(DELETE.from(db.entities[Order.Entity.Orders]).where({ OrderNr: orderNr }));
        await db.tx(req).run(INSERT.into(db.entities[Order.Entity.Orders]).entries(order));
        // await db.tx(req).run(UPDATE.entity(db.entities[Order.Entity.Orders], order.OrderNr).with(order));
    } catch (error) {
        if (error instanceof Error) {
            const e: Error = <any>error;
            throw new OrderError(`Inserting the order details for ${orderNr} did not succeed`, 500, ErrorType.HANA, e.message);
        }
    }
}

const getInvoice = async (req: Request, OrderNr: string, InvoiceNr: string): Promise<any> => {
    const db = await cds.connect.to('db');
    try {
        const invoiceUrl: Order.IInvoices = (await cds.run(SELECT.one.from(db.entities[Order.Entity.Invoices]).where(
            { Order_OrderNr: OrderNr, InvoiceNr: InvoiceNr }).columns('InvoiceUrl'))).InvoiceUrl;
        console.log(invoiceUrl);
        const HIPInvoiceAxios = getHIPInvoiceAxios();
        try {
            const pdf: any = (await HIPInvoiceAxios({
                method: 'GET',
                url: `/${invoiceUrl}`,
                responseType: 'arraybuffer',
                headers: {
                    'apikey': '36cbc92c8f5249fcbc346c4a37df4a36' // FIXME This should not be here
                }
            })).data;
            return Buffer.from(pdf).toString('base64');
            // var streamBuffers = require('stream-buffers');
            // var myWritableStreamBuffer = new streamBuffers.WritableStreamBuffer({
            //     initialSize: (100 * 1024),   // start at 100 kilobytes.
            //     incrementAmount: (10 * 1024) // grow by 10 kilobytes each time buffer overflows.
            // });
            // myWritableStreamBuffer.write(Buffer.from(pdf).toString('base64'));
            // return myWritableStreamBuffer.getContents();
            // let memStream = new MemoryStream(null, { readable: false });
            // pdf.pipe(memStream);
            // pdf.on('end', function() {
            //     console.log(memStream.toString());
            // });
            // console.log('ok');
            // return {
            //     value: Buffer.from(pdf).toString('base64'),
            //     '*@odata.mediaContentType': 'application/pdf'
            // }
            // return Buffer.from(pdf).toString("base64");
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log("error");
    }

    return '';
}


/* Helper methods */
const getFilterStatus = (req: Request): string | undefined => {
    // @ts-ignore
    const queryOptions = req._queryOptions;
    if (queryOptions?.$filter) {
        return RegEx.status.getFilter.exec(queryOptions.$filter)?.[1]?.replace(/'/g, '');
    }
    return;
}
const transformToDetails = (orderDetails: hip.IOrderDetails, customer: Order.ICustomer): Order.IOrder => {
    const orderNr = orderDetails.orderHeader.orderDocumentSAP;
    return {
        OrderNr: orderNr,
        OrderDate: new Date(orderDetails.orderHeader.orderDate),
        Status: orderDetails.orderHeader.orderStatus,
        CustomerReference: orderDetails.orderHeader.orderCustomerRef,
        SalesOrg: customer.SalesOrg,
        SoldTo: customer.SoldTo,
        SoldToName: customer.SoldToName,
        TotalAmount: orderDetails.orderTotal.orderNetTotal,
        TotalCurrency: orderDetails.orderTotal.currency,
        LineItems: orderDetails.lineItems.map(l => ({
            // OrderNr: orderNr,
            Position: l.position,
            MaterialNr: l.sku,
            MaterialDescription: l.name,
            Quantity: l.quantity,
            UnitOfMeasure: l.unitOfMeasurement,
            ListPrice: l.listPrice,
            DiscountPercentage: l.discounts && l.discounts[0] ? l.discounts[0].percentage : 0,
            DiscountAmount: l.listPrice - l.netPrice,
            NetPrice: l.netPrice,
            TotalAmount: l.netPriceTotal,
            Currency: l.currency
        })),
        Deliveries: orderDetails.shipments.length > 0 ? orderDetails.shipments.map(s => {
            return s.packages.map(p => ({
                // OrderNr: orderNr,
                Date: new Date(s.shipmentDate),
                // ExpectedDeliveryDate: new Date(0),
                TrackingNr: p.trackingNumber,
                TrackingUrl: p.trackingLink,
                Items: p.items.map(i => ({
                    // OrderNr: orderNr,
                    // DeliveryDate: new Date(0),
                    MaterialNr: i.sku,
                    MaterialDescription: '',
                    Quantity: i.quantity
                }))
            }))
        }).flat() : undefined,
        DeliveryInformation: {
            Id: orderDetails.addresses.shipTo.id,
            Name: orderDetails.addresses.shipTo.name,
            Street: orderDetails.addresses.shipTo.street1,
            Number: orderDetails.addresses.shipTo.houseNumber,
            City: orderDetails.addresses.shipTo.city,
            Zip: orderDetails.addresses.shipTo.postalCode,
            Country: orderDetails.addresses.shipTo.country,
            CountryCode: orderDetails.addresses.shipTo.countryCode
        },
        SalesInformation: {
            Id: orderDetails.addresses.shipTo.id,
            Name: orderDetails.addresses.shipTo.name,
            Street: orderDetails.addresses.shipTo.street1,
            Number: orderDetails.addresses.shipTo.houseNumber,
            City: orderDetails.addresses.shipTo.city,
            Zip: orderDetails.addresses.shipTo.postalCode,
            Country: orderDetails.addresses.shipTo.country,
            CountryCode: orderDetails.addresses.shipTo.countryCode
        },
        PaymentInformation: {
            Id: orderDetails.addresses.shipTo.id,
            Name: orderDetails.addresses.shipTo.name,
            Street: orderDetails.addresses.shipTo.street1,
            Number: orderDetails.addresses.shipTo.houseNumber,
            City: orderDetails.addresses.shipTo.city,
            Zip: orderDetails.addresses.shipTo.postalCode,
            Country: orderDetails.addresses.shipTo.country,
            CountryCode: orderDetails.addresses.shipTo.countryCode,
            PaymentTerms: orderDetails.payment.paymentTerms,
            Currency: orderDetails.orderTotal.currency
        },
        Invoices: orderDetails.payment.invoiceLink.length > 0 ? orderDetails.payment.invoiceLink.map(i => ({
            // OrderNr: orderNr,
            InvoiceNr: i.invoiceNumber,
            InvoiceUrl: `https://google.com/${RegEx.invoice.getId.exec(i.link)?.[1]}` || '',
            // Pdf: ''
        })) : undefined
    };
}
const enrichWithInvoices = async (order: Order.IOrder) => {
    order.Deliveries?.forEach(d => {
        d.Items?.forEach(i => {
            const material = order.LineItems?.find(li => (li.MaterialNr === i.MaterialNr));
            if (material) {
                i.MaterialDescription = material.MaterialDescription;
            }
        })
    });
    // if (order.Invoices) {
    //     const HIPInvoiceAxios = getHIPInvoiceAxios();
    //     let promiseChain: Promise<AxiosResponse<any>>[] = [];
    //     order.Invoices?.forEach(i => {
    //         promiseChain.push(HIPInvoiceAxios({
    //             method: 'GET',
    //             url: `/${i.InvoiceUrl}`,
    //             responseType: 'arraybuffer', 
    //             headers: {
    //                 'apikey': '36cbc92c8f5249fcbc346c4a37df4a36' // FIXME This should not be here
    //             }
    //         }));
    //     });
    //     await Promise.all(promiseChain).then((results) => {
    //         results.forEach(r => {
    //             let test = order.Invoices?.find(o => (o.InvoiceUrl === r.config.url?.replace('/', '')));
    //             // if (test) test.InvoicePdf = r.data;
    //             if (test) {
    //                 console.log(Buffer.from(r.data).toString("base64"));
    //                 test.InvoicePdf = Buffer.from(r.data).toString("base64");
    //             }
    //         });
    //     });
    // }
    return order;
}

const getCustomersToUpdate = async (customers: Order.ICustomer[]): Promise<Order.ICustomer[]> => {
    const db = await cds.connect.to('db');
    let yesterday = (new Date(new Date().getTime() - 24 * 60 * 60 * 1000)).toISOString();
    return customers.filter(async c => {
        const order: Order.IOrder = await cds.run(SELECT.one.from(db.entities[Order.Entity.Orders]).where(
            { SoldTo: c.SoldTo, SalesOrg: c.SalesOrg, LastModified: { '>=': yesterday } }).columns('OrderNr').orderBy('LastModified'));
        if (!order) {
            return true;
        }
        return false;
    });
}
const createWhereStatement = (customers: Order.ICustomer[]): any => {
    return { SoldTo: { in: customers.map(c => (c.SoldTo)) } };
}
module.exports = OrderService;