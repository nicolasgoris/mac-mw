import SapCfAxios, { AxiosRequestConfig, AxiosResponse } from "sap-cf-axios";

class HIPOrder {
    private static instance: { [key: string]: HIPOrder } = {};
    private static axios: <T>(req: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    private constructor(subscribedDomain: string) {
        HIPOrder.axios = SapCfAxios('HIP_Orders', { subscribedDomain });
    }
    public static getAxios(subscribedDomain: string) {
        if (!HIPOrder.instance[subscribedDomain]) {
            HIPOrder.instance[subscribedDomain] = new HIPOrder(subscribedDomain);
        }
        return HIPOrder.axios;
    }
}

class UserMgmt {
    private static instance: { [key: string]: UserMgmt } = {};
    private static axios: <T>(req: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    private constructor(subscribedDomain: string) {
        UserMgmt.axios = SapCfAxios('MAC_USERAPI', { subscribedDomain });
    }
    public static getAxios(subscribedDomain: string) {
        if (!UserMgmt.instance[subscribedDomain]) {
            UserMgmt.instance[subscribedDomain] = new UserMgmt(subscribedDomain);
        }
        return UserMgmt.axios;
    }
}

export function getHIPOrderAxios(subscribedDomain: any | string) {
    return HIPOrder.getAxios(getTenantName(subscribedDomain));
}

export function getUserMgmtAxios(subscribedDomain: any | string) {
    return UserMgmt.getAxios(getTenantName(subscribedDomain));
}

export function getTenantName(subscribedDomain: any | string) {
    return typeof subscribedDomain === 'string' ? subscribedDomain : subscribedDomain.req.authInfo.getSubdomain() || "default";
}