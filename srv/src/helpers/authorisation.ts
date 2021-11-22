import { Request } from "@sap/cds/apis/services";
import { Order } from "../definitions/order";
import cds from "@sap/cds";
import { getUserMgmtAxios } from "./axios";

const RegEx = {
    soldTo: {
        getFilter: /SoldTo eq '[0-9]+'/g,
        getId: /[0-9]+/g
    },
    salesOrg: {
        getFilter: /SalesOrg eq '[A-z0-9]{4}'/g,
        getId: /[A-z]{2}[0-9]{2}/g
    }
}

export class Authorisation {
    // private static instance: { [key: string]: Authorisation } = {};
    private static instance: Authorisation;
    private static customerIds: { [key: string]: Order.ICustomer[] } = {};
    private constructor() { }
    // public static getAuthorisation(subscribedDomain: string) {
    public static getAuthorisation() {
        if (!Authorisation.instance) {
            Authorisation.instance = new Authorisation();
        }
        return Authorisation.instance;
    }

    public async getCustomers(req: Request): Promise<Order.ICustomer[]> {
        // @ts-ignore
        const userId = req.user.id !== "" ? req.user.id : req.req.authInfo.getLogonName();
        if (!Authorisation.customerIds[userId]) {
            const UserMgmtAxiois = getUserMgmtAxios(req);
            try {
                const token = req.user.attr.appToken; // req.user._req.authInfo.getAppToken()
                const answer: any = await UserMgmtAxiois({
                    method: 'GET',
                    url: `/user/Users(%27me%27)?$expand=organisations`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const organisations = answer.data.organisations.filter(o => o.type === 'CUSTOMER').map(o => ({ logonName: userId, id: o.id, salesOrg: o.lineage }));
                Authorisation.customerIds[userId] = organisations;
            } catch (e) {
                throw Object.assign(new Error(`Retrieving the customers for the current user failed.`), { cause: e });
            }
            // Authorisation.customerIds[userId] = [{ logonName: userId, id: '100326076', salesOrg: 'BE40' }]; // Retrieve the customers for the given user
        }
        return Authorisation.customerIds[userId];
    }

    public async checkCustomerIsAllowed(req: Request): Promise<Order.ICustomer | undefined> {
        // @ts-ignore
        if (req._queryOptions && req._queryOptions.$filter) {
            const customers = await Authorisation.instance.fillCustomers(req),
                // @ts-ignore
                filter = req._queryOptions.$filter,
                customerId = filter.match(RegEx.soldTo.getFilter)[0].match(RegEx.soldTo.getId)[0],
                salesOrg = filter.match(RegEx.salesOrg.getFilter)[0].match(RegEx.salesOrg.getId)[0];
            return customers.find(c => c.id+'6' === customerId && c.salesOrg === salesOrg);
        } else {
            throw new Error(`No filter data present.`);
        }
    }

    public fillCustomers = async (req: Request): Promise<Order.ICustomer[]> => {
        return await Authorisation.instance.getCustomers(req);
        // const customers = await Authorisation.instance.getCustomers(req),
        //     db = await cds.connect.to('db');
        // try {
        //     const result = await db.tx(req).run(INSERT.into(db.entities['Order.Customer']).entries(customers));
        //     //'SQLITE_ERROR: no such table: mac_mw_order_Customer in: \nINSERT INTO mac_mw_order_Customer ( logonName, id, salesOrg ) VALUES ( ?, ?, ? )'
        //     return customers;
        // } catch (error) {
        //     console.error('Error');
        //     return [];
        // }
    }
}