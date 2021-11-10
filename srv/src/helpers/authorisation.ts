import { Request } from "@sap/cds/apis/services";

export class Authorisation {
    private static instance: { [key: string]: Authorisation } = {};
    private static customerIds: { [key: string]: string[] } = {};
    private constructor(subscribedDomain: string) {

    }
    public static getAuthorisation(subscribedDomain: string) {
        if (!Authorisation.instance[subscribedDomain]) {
            Authorisation.instance[subscribedDomain] = new Authorisation(subscribedDomain);
        }
        return Authorisation.instance[subscribedDomain];
    }

    public async getCustomerIds(req: Request): Promise<any> {
        //@ts-ignore
        const userId = req.query.userId.toString() !== "" ? req.query.userId.toString() : req.authInfo.getLogonName();
        if (!Authorisation.customerIds[userId]) {
            Authorisation.customerIds[userId] = ['1','2']; // Retrieve the customer IDs for the given user
        }
        return Authorisation.customerIds[userId];
    }
}