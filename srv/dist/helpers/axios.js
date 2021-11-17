"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTenantName = exports.getHIPAxios = void 0;
const sap_cf_axios_1 = __importDefault(require("sap-cf-axios"));
class HIPAxios {
    constructor(subscribedDomain) {
        HIPAxios.axios = sap_cf_axios_1.default('HIP_Orders', { subscribedDomain });
    }
    static getAxios(subscribedDomain) {
        if (!HIPAxios.instance[subscribedDomain]) {
            HIPAxios.instance[subscribedDomain] = new HIPAxios(subscribedDomain);
        }
        return HIPAxios.axios;
    }
}
HIPAxios.instance = {};
function getHIPAxios(subscribedDomain) {
    return HIPAxios.getAxios(getTenantName(subscribedDomain));
}
exports.getHIPAxios = getHIPAxios;
function getTenantName(subscribedDomain) {
    return typeof subscribedDomain === 'string' ? subscribedDomain : subscribedDomain.req.authInfo.getSubdomain() || "default";
}
exports.getTenantName = getTenantName;
//# sourceMappingURL=axios.js.map