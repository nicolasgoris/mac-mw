"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cds_1 = __importDefault(require("@sap/cds"));
// import { Request } from "@sap/cds/apis/services";
const authorisation_1 = require("./helpers/authorisation");
const axios_1 = require("./helpers/axios");
// @ts-ignore
const LOG = cds_1.default.log('sql');
class OrderService extends cds_1.default.ApplicationService {
    async init() {
        this.before("READ", "Order", (req) => {
            // const HIPAxios = getHIPAxios(getTenantName(req));
            LOG.info("customerIds");
            const customerIds = authorisation_1.Authorisation.getAuthorisation((0, axios_1.getTenantName)(req)).getCustomerIds(req); // Retrieve the customer IDs allowed to be used by the current user
            console.error(customerIds);
            console.error(req.data);
            // TODO write logic to retrieve all data from HIP
        });
        // Will run via the default on HANA DB
        this.on("READ", "Order", (req) => {
            console.log("read");
            console.log(req.data);
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
module.exports = OrderService;
//# sourceMappingURL=order.js.map