import { Request } from "@sap/cds/apis/services";
import { Order } from "../definitions/order";
import { iam } from "../definitions/usermgmt";
import { getUserMgmtAxios } from "./axios";
import { ErrorType, OrderError } from "./error";

const RegEx = {
    soldTo: {
        getFilter: /SoldTo eq '([0-9]+)'/gm
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
            return answer.data.customers.map((c) => ({ UserName: userId, SoldTo: c.id, SoldToName: c.name, SalesOrg: c.salesOrganisation }));
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

    public async retrieveAuthorisedCustoemrs(req: Request): Promise<Order.ICustomer[]> {
        const customersFromQuery = this.retrieveCustomersFromQuery(req),
            customers = await Authorisation.instance.getCustomers(req);
        return customers.filter(c => customersFromQuery.find(cq => cq === c.SoldTo));
    }

    public checkOrderIsAllowed = async (req: Request, SoldTo: string): Promise<Order.ICustomer | undefined> => {
        const customers = await Authorisation.instance.getCustomers(req);
        return customers.find(c => parseInt(c.SoldTo) === parseInt(SoldTo));
    }

    private retrieveCustomersFromQuery = (req: Request): string[] => {
        // @ts-ignore
        const queryOptions = req._queryOptions;
        if (queryOptions?.$filter) {
            let soldTos: string[] = [];
            let soldTo = RegEx.soldTo.getFilter.exec(queryOptions.$filter);
            while (soldTo !== null) {
                soldTos.push(soldTo?.[1]);
                soldTo = RegEx.soldTo.getFilter.exec(queryOptions.$filter)
            }
            if (soldTos.length === 0) {
                throw new OrderError(`No filter options are provided, please select at least one customer`, 500, ErrorType.LOGIC, '');
            }
            return soldTos;
        } else {
            throw new OrderError(`No filter options are provided, please select at least one customer`, 500, ErrorType.LOGIC, '');
        }
    }
}