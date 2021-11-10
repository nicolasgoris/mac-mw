import cds from "@sap/cds";
import { Authorisation } from "./helpers/authorisation";
import { getHIPAxios, getTenantName } from "./helpers/axios";

export class OrderService extends cds.ApplicationService {
    async init() {
        this.before("READ", "Order", (req) =>{
            const HIPAxios = getHIPAxios(getTenantName(req));
            const customerIds = Authorisation.getAuthorisation(getTenantName(req)).getCustomerIds(req); // Retrieve the customer IDs allowed to be used by the current user
            // TODO write logic to retrieve all data from HIP
        });
        // Will run via the default on HANA DB
        // this.on("READ", "Order", (req)=>{});
        await super.init();
    }
}