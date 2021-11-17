"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorisation = void 0;
class Authorisation {
    constructor() { }
    static getAuthorisation(subscribedDomain) {
        if (!Authorisation.instance[subscribedDomain]) {
            Authorisation.instance[subscribedDomain] = new Authorisation();
        }
        return Authorisation.instance[subscribedDomain];
    }
    async getCustomerIds(req) {
        //@ts-ignore
        const userId = req.query.userId.toString() !== "" ? req.query.userId.toString() : req.authInfo.getLogonName();
        if (!Authorisation.customerIds[userId]) {
            Authorisation.customerIds[userId] = ['1', '2']; // Retrieve the customer IDs for the given user
        }
        return Authorisation.customerIds[userId];
    }
}
exports.Authorisation = Authorisation;
Authorisation.instance = {};
Authorisation.customerIds = {};
//# sourceMappingURL=authorisation.js.map