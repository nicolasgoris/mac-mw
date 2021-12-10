import { Request } from "@sap/cds/apis/services";
import { Order } from "../definitions/order";
import { iam } from "../definitions/usermgmt";
import { getUserMgmtAxios } from "./axios";
import { ErrorType, OrderError } from "./error";

const RegEx = {
    soldTo: {
        getFilter: /SoldTo eq '([0-9]+)'/
    },
    salesOrg: {
        getFilter: /SalesOrg eq '([A-z]{2}[0-9]{2})'/
    }
}

export class Authorisation {
    private static instance: Authorisation;
    private constructor() { }
    private async getCustomersFromAPI(req: Request): Promise<Order.ICustomer[]> {
        // @ts-ignore
        const userId = req.user.id !== "" ? req.user.id : req.req.authInfo.getLogonName();
        const UserMgmtAxiois = getUserMgmtAxios();
        try {
            const token = req.user.attr.appToken;
            const answer = await UserMgmtAxiois<iam.User>({
                method: 'GET',
                url: `/user/Users(%27me%27)?$expand=customers`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            });
            return answer.data.customers.filter(c => c.type === 'DIRECT').map((c) => ({ UserName: userId, SoldTo: c.id, SoldToName: c.name, SalesOrg: c.salesOrganisation_id }));
        } catch (error) {
            if (error instanceof Error) {
                const e: Error = <any>error;
                throw new OrderError(`Retrieving the customers for the current user (${userId}) failed.`, 503, ErrorType.API, e.message);
            }
            const cust: Order.ICustomer = { UserName: '', SoldTo: '', SoldToName: '', SalesOrg: '' };
            return [cust];
        }
    }
    public static getAuthorisation() {
        if (!Authorisation.instance) {
            Authorisation.instance = new Authorisation();
        }
        return Authorisation.instance;
    }

    public getCustomers = async (req: Request): Promise<Order.ICustomer[]> => {
        return await Authorisation.instance.getCustomersFromAPI(req);
    }

    public async checkCustomerIsAllowed(req: Request): Promise<Order.ICustomer | undefined> {
        // @ts-ignore
        const queryOptions = req._queryOptions;
        if (queryOptions?.$filter) {
            const customers = await Authorisation.instance.getCustomers(req),
                filter = queryOptions.$filter,
                soldTo = RegEx.soldTo.getFilter.exec(queryOptions.$filter)?.[1];
            return customers.find(c => c.SoldTo === soldTo);
        } else {
            req.reject(400, `No customer information is present.`);
        }
        return;
    }

    public checkOrderIsAllowed = async (req: Request, OrderNr: any): Promise<boolean> => {
        return true; // TODO check if the current user has access to this order. How to check??
    }
}