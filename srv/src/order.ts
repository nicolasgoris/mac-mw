import cds from "@sap/cds";
import { Request } from "@sap/cds/apis/services";
import { Authorisation } from "./helpers/authorisation";
import { getHIPOrderAxios } from "./helpers/axios";
import { Order } from "./definitions/order";
import { hip } from "./hip/order";
import { AxiosResponse } from "sap-cf-axios";

const RegEx = {
    status: {
        getFilter: /Status eq '[A-z]+'/g,
        getStatus: /'[A-z]+'/g
    }
}

const STATUS_OPEN = 'Open';

class OrderService extends cds.ApplicationService {
    async init() {
        /* Only share live data for Customers since this can be updated on the fly */
        this.on("READ", "Customer", async (req: Request) => {
            try {
                return await Authorisation.getAuthorisation().fillCustomers(req);
            } catch (e) {
                if (e instanceof Error) {
                    const error: any = <any>e;
                    return req.reject(500, error.message, typeof error.cause === 'string' ? error.cause : error.cause.response.data.message);
                }
            }
            return;
        });
        /* Retrieve the Order information beforehand, store it in the HANA db and use it for the response (read) */
        this.before("READ", "Order", async (req: Request) => {
            const { OrderNr } = req.data;
            if (OrderNr && checkAccessToOrder(OrderNr)) {
                const order = await getOrder(OrderNr);
                return order;
            } else {
                const status = getFilterStatus(req);
                if (status && status === STATUS_OPEN) {
                    req.reject(500, `You cannot request open orders yet.`);
                } else {
                    const customer: Order.ICustomer | undefined = await Authorisation.getAuthorisation().checkCustomerIsAllowed(req);
                    if (customer) {
                        const db = await cds.connect.to('db'),
                            yesterday = new Date().toISOString();
                        // TODO check why where clause on Date yesterday is not working
                        const order: Order.IOrder = await cds.run(SELECT.one.from(db.entities[Order.Entity.Order]).where(
                            { SoldTo: customer.id, SalesOrg: customer.salesOrg, LastModified: { '>=': yesterday } }));
                        if (!order) {
                            await db.tx(req).run(DELETE.from(db.entities[Order.Entity.Order]).where({ SoldTo: customer.id, and: { SalesOrg: customer.salesOrg } }));
                            await updateOrders(req, customer);
                        }
                    } else {
                        req.reject(403, `You do not have access to retrieve data for this customer or customer information is incorrect.`);
                    }
                }
            }
            return;
        });
        await super.init();
    }
}

const updateOrders = async (req: Request, customer: Order.ICustomer): Promise<Boolean> => {
    try {
        const db = await cds.connect.to('db'),
            today = new Date(),
            orders = await getOrders(req, customer);
        await db.tx(req).run(INSERT.into(db.entities[Order.Entity.Order]).entries(orders.map(o => { delete o.Details; return o; })));
        return true;
    } catch (error) {
        throw Object.assign(new Error(`Inserting the orders in HANA did not succeed.`), { cause: error });
    }

}

const getOrders = async (req: Request, customer: Order.ICustomer): Promise<Order.IOrder[]> => {
    const HIPOrderAxios = getHIPOrderAxios(req);
    let orders: Order.IOrder[] = [];
    let fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 5);
    const answer = await HIPOrderAxios<hip.IOrder[]>({
        method: 'GET',
        url: `/?soldTo=${customer.id}&salesOrg=${customer.salesOrg}&fromDate=${fromDate.toISOString().split('T')[0]}&toDate=${(new Date()).toISOString().split('T')[0]}`,
        headers: {
            'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
        }
    });
    orders = answer.data.map((o) => {
        return {
            OrderNr: o.orderDocumentSAP,
            OrderDate: new Date(o.orderDate),
            // WebOrder >> NOT AVAILABLE
            Status: o.status,
            // ExpectedDeliveryDate >> NOT AVAILABLE
            CustomerReference: o.orderCustomerRef,
            SalesOrg: customer.salesOrg,
            SoldTo: customer.id,
            // ShipToCountry: 
            // ShipToCity: 
            TotalAmount: o.totalValue,
            TotalCurrency: o.currency,
            // CreatedBy >> NOT AVAILABLE
        }
    });
    // let promiseChain: Promise<AxiosResponse<hip.IOrderDetails, any>>[] = [];
    let promiseChain: Promise<any>[] = [];
    // orders.forEach((o: Order.IOrder) => {
    //     promiseChain.push(HIPOrderAxios({
    //         method: 'GET',
    //         url: `/${o.OrderNr}`,
    //         headers: {
    //             'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
    //         }
    //     }));
    // });
    promiseChain.push(HIPOrderAxios<hip.IOrderDetails>({
        method: 'GET',
        url: `/0014462104`,
        headers: {
            'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
        }
    }));
    promiseChain.push(HIPOrderAxios<hip.IOrderDetails>({
        method: 'GET',
        url: `/0014454635`,
        headers: {
            'apikey': '36cbc92c8f5249fcbc346c4a37df4a36'
        }
    }));
    try {
        await Promise.all(promiseChain).then((results) => {
            results.forEach(res => {
                orders = orders.map(
                    (oo: Order.IOrder) => oo.OrderNr === res.data.orderHeader.orderDocumentSAP ?
                        {
                            ...oo, ...{
                                ShipToCountry: res.data.addresses.shipTo.countryCode, ShipToCity: res.data.addresses.shipTo.city,
                                Details: {
                                    OrderNr: oo.OrderNr,
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
                                        OrderNr: oo.OrderNr,
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
                                        OrderNr: oo.OrderNr,
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
                                        OrderNr: oo.OrderNr,
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
    } catch (error) {
        throw Object.assign(new Error(`Retrieving the details of the orders failed. (Order: ${error.request.path})`), { cause: error });
    }
    return orders;
}

module.exports = OrderService

const getFilterStatus = (req: Request): string => {
    // @ts-ignore
    if (req._queryOptions && req._queryOptions.$filter) {
        // @ts-ignore
        const filter = req._queryOptions.$filter;
        if (filter.match(RegEx.status.getFilter) && filter.match(RegEx.status.getFilter)[0]) {
            if (filter.match(RegEx.status.getFilter)[0].match(RegEx.status.getStatus) && filter.match(RegEx.status.getFilter)[0].match(RegEx.status.getStatus)[0]) {
                return filter.match(RegEx.status.getFilter)[0].match(RegEx.status.getStatus)[0].replace(/'/g, '');
            }
        }
    }
    return '';
}
const checkAccessToOrder = async (OrderNr: string): Promise<Boolean> => {
    return true;
}

const getOrder = async (req: Request): Promise<any> => {
    return {};
}
