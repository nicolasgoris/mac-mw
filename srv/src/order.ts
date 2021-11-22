import cds from "@sap/cds";
import { Request } from "@sap/cds/apis/services";
import { Authorisation } from "./helpers/authorisation";
import { getHIPOrderAxios } from "./helpers/axios";
import { Order } from "./definitions/order";

class OrderService extends cds.ApplicationService {
    async init() {
        this.before("READ", "Customer", async (req: Request) => {
            try {
                const customers = await Authorisation.getAuthorisation().fillCustomers(req);
                return customers;                
            } catch (e) {
                if (e instanceof Error) {
                    const error: any = <any>e;
                    return req.reject(500, error.message, error.cause.response.data.message);
                }
            }
            return;
        });
        this.before("READ", "Order", async (req: Request) => {
            // console.log("read");
            // console.log(req.data);
            // const customer: Order.ICustomer | undefined = await Authorisation.getAuthorisation().checkCustomerIsAllowed(req);
            // if (customer) {
            //     const orders = await getOrders(req, customer);
            //     // TODO save the orders to the database
            //     // const db = await cds.connect.to('db');
            //     // await db.tx(req).run(INSERT.into(db.entities['Order.Order']).entries(orders));
            //     return orders;
            // } else {
            //     req.reject(403, `You do not have access to retrieve data for this customer.`);
            // }
            // return;
        });
        this.on("READ", "Order", async (req: Request) => {
            // TODO change to const
            let customer: Order.ICustomer | undefined = await Authorisation.getAuthorisation().checkCustomerIsAllowed(req);
            if (customer) {
                try {
                    // TODO needs to collect the data from the Hana DB
                    customer.id += '6';
                    const orders = await getOrders(req, customer);
                    return orders;
                } catch (e) {
                    if (e instanceof Error) {
                        const error: any = <any>e;
                        return req.reject(500, error.message, error.cause.response.data.message);
                    }
                }
            }
            return req.reject(403, `You do not have access to retrieve data for this customer or customer information is missing.`);
        });
        await super.init();
    }
}

// module.exports = async (OrderService) => {
//     OrderService.before('READ', 'Order', (req: Request) => {
//         const customerIds = Authorisation.getAuthorisation(getTenantName(req)).getCustomerIds(req); // Retrieve the customer IDs allowed to be used by the current user
//         console.log(customerIds);
//         console.log(req.data);
//     })
//     OrderService.on('READ', 'Order', (req: Request) => {
//         console.log(req.data);
//     })
// }

const getOrders = async (req: Request, customer: Order.ICustomer): Promise<Order.IOrder[]> => {
    const HIPOrderAxios = getHIPOrderAxios(req);
    let orders: Order.IOrder[] = [];
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 5);
    const answer: any = await HIPOrderAxios({
        method: 'GET',
        url: `/?soldTo=${customer.id}&salesOrg=${customer.salesOrg}&fromDate=${fromDate.toISOString().split('T')[0]}&toDate=${(new Date()).toISOString().split('T')[0]}`,
        headers: {
            'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
        }
    });
    orders = answer.data.map(o => {
        return {
            OrderNr: o.orderDocumentSAP,
            OrderDate: o.orderDate,
            // WebOrder >> NOT AVAILABLE
            Status: o.status,
            // ExpectedDeliveryDate >> NOT AVAILABLE
            CustomerReference: o.orderCustomerRef,
            SoldTo: customer.id,
            // ShipToCountry: 
            // ShipToCity: 
            TotalAmount: o.totalValue,
            TotalCurrency: o.currency,
            // CreatedBy >> NOT AVAILABLE
        }
    });
    let promiseChain: Promise<any>[] = [];
    promiseChain.push(HIPOrderAxios({
        method: 'GET',
        url: `/0014462104`,
        headers: {
            'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
        }
    }));
    promiseChain.push(HIPOrderAxios({
        method: 'GET',
        url: `/0014454635`,
        headers: {
            'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
        }
    }));
    // orders.forEach((o: Order.IOrder) => {
    //     promiseChain.push(HIPOrderAxios({
    //         method: 'GET',
    //         url: `/${o.OrderNr}`,
    //         headers: {
    //             'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
    //         }
    //     }));
    // });
    try {
        await Promise.all(promiseChain).then((results) => {
            results.forEach((res: any) => {
                orders = orders.map(
                    (oo: Order.IOrder) => oo.OrderNr === res.data.orderHeader.orderDocumentSAP ?
                        {
                            ...oo, ...{
                                ShipToCountry: res.data.addresses.shipTo.countryCode, ShipToCity: res.data.addresses.shipTo.city,
                                Details: {
                                    LineItems: res.data.lineItems.map(l => ({
                                        OrderNr: oo.OrderNr,
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
                                    Deliveries: res.data.shipments.map(s => {
                                        return s.packages.map(p => ({
                                            OrderNr: oo.OrderNr,
                                            Date: s.shipmentDate,
                                            Status: 'NOT AVAILABLE',
                                            ExpectedDeliveryDate: 'NOT AVAILABLE',
                                            TrackingNr: p.trackingNumber,
                                            TrackingUrl: p.trackingLink,
                                            Items: p.items.map(i => ({
                                                OrderNr: oo.OrderNr,
                                                DeliveryDate: 'NOT AVAILABLE',
                                                MaterialNr: i.sku,
                                                MaterialDescription: 'TODO',
                                                Quantity: i.quantity
                                            }))
                                        }))
                                    }).flat(),
                                    DeliveryInformation: {
                                        Id: res.data.addresses.shipTo.id,
                                        Name: res.data.addresses.shipTo.name,
                                        Street: res.data.addresses.shipTo.street1,
                                        Number: res.data.addresses.shipTo.houseNumber,
                                        City: res.data.addresses.shipTo.city,
                                        Zip: res.data.addresses.shipTo.postalCode,
                                        Country: res.data.addresses.shipTo.country,
                                        CountryCode: res.data.addresses.shipTo.countryCode
                                    },
                                    SalesInformation: {
                                        Id: res.data.addresses.soldTo.id,
                                        Name: res.data.addresses.soldTo.name,
                                        Street: res.data.addresses.soldTo.street1,
                                        Number: res.data.addresses.soldTo.houseNumber,
                                        City: res.data.addresses.soldTo.city,
                                        Zip: res.data.addresses.soldTo.postalCode,
                                        Country: res.data.addresses.soldTo.country,
                                        CountryCode: res.data.addresses.soldTo.countryCode
                                    },
                                    PaymentInformation: {
                                        Id: res.data.addresses.payer.id,
                                        Name: res.data.addresses.payer.name,
                                        Street: res.data.addresses.payer.street1,
                                        Number: res.data.addresses.payer.houseNumber,
                                        City: res.data.addresses.payer.city,
                                        Zip: res.data.addresses.payer.postalCode,
                                        Country: res.data.addresses.payer.country,
                                        CountryCode: res.data.addresses.payer.countryCode
                                    },
                                    Invoices: res.data.payment.invoiceLink.map(i => ({
                                        OrderNr: oo.OrderNr,
                                        InvoiceNr: i.invoiceNumber,
                                        InvoiceUrl: i.link,
                                        InvoiceBase64: 'TOOD'
                                    }))
                                }
                            }
                        }
                        : oo);
            });
        });
    } catch (e) {
        throw Object.assign(new Error(`Retrieving the details of the orders failed. (Order: ${e.request.path})`), { cause: e });
    }
    return orders;
}

module.exports = OrderService