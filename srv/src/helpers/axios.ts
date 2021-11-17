import SapCfAxios, { AxiosRequestConfig, AxiosResponse } from "sap-cf-axios";

class HIPAxios {
    private static instance: { [key: string]: HIPAxios } = {};
    private static axios: <T>(req: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
    private constructor(subscribedDomain: string) {
        HIPAxios.axios = SapCfAxios('HIP_Orders', { subscribedDomain });
    }
    public static getAxios(subscribedDomain: string) {
        if (!HIPAxios.instance[subscribedDomain]) {
            HIPAxios.instance[subscribedDomain] = new HIPAxios(subscribedDomain);
        }
        return HIPAxios.axios;
    }
}

export function getHIPAxios(subscribedDomain: any | string) {
    return HIPAxios.getAxios(getTenantName(subscribedDomain));
}

export function getTenantName(subscribedDomain: any | string) {
    return typeof subscribedDomain === 'string' ? subscribedDomain : subscribedDomain.req.authInfo.getSubdomain() || "default";
}