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

class HIPInvoice {
    private static instance: HIPInvoice;
    private axios: <T>(req: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    private constructor() {
        this.axios = SapCfAxios('HIP_Invoices');
    }
    public static getAxios() {
        if (!HIPInvoice.instance) {
            HIPInvoice.instance = new HIPInvoice();
        }
        return HIPInvoice.instance.axios;
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

export function getHIPOrderAxios() {
    return HIPOrder.getAxios();
}

export function getHIPInvoiceAxios() {
    return HIPInvoice.getAxios();
}

export function getUserMgmtAxios() {
    return UserMgmt.getAxios();
}