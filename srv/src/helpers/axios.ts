import SapCfAxios, { AxiosRequestConfig, AxiosResponse } from "sap-cf-axios";

class HIPOrder {
    private static instance: HIPOrder;
    private axios: <T>(req: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    private constructor() {
        this.axios = SapCfAxios('HIP_Orders');
    }
    public static getAxios() {
        if (!HIPOrder.instance) {
            HIPOrder.instance = new HIPOrder();
        }
        return HIPOrder.instance.axios;
    }
}

class UserMgmt {
    private static instance: UserMgmt;
    private axios: <T>(req: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    private constructor() {
        this.axios = SapCfAxios('MAC_USERAPI');
    }
    public static getAxios() {
        if (!UserMgmt.instance) {
            UserMgmt.instance = new UserMgmt();
        }
        return UserMgmt.instance.axios;
    }
}

export function getHIPOrderAxios(subscribedDomain: any | string) {
    return HIPOrder.getAxios();
}

export function getUserMgmtAxios(subscribedDomain: any | string) {
    return UserMgmt.getAxios();
}