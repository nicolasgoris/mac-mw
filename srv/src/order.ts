import cds from "@sap/cds";
// import { Request } from "@sap/cds/apis/services";
import { Authorisation } from "./helpers/authorisation";
import { getTenantName } from "./helpers/axios";

// @ts-ignore
const LOG = cds.log('sql');

class OrderService extends cds.ApplicationService {
    async init() {
        this.before("READ", "Order", (req) => {
            // const HIPAxios = getHIPAxios(getTenantName(req));
            LOG.info("customerIds");
            const customerIds = Authorisation.getAuthorisation(getTenantName(req)).getCustomerIds(req); // Retrieve the customer IDs allowed to be used by the current user
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

module.exports = OrderService