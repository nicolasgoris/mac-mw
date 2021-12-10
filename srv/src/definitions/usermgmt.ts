export namespace iam {
    export interface User {
        customers: Customer[]
        displayName: string;
        id: string;
        mail: string;
        principalName: string;
        roles: Role[];
    }
    export interface Customer {
        canOrder: boolean;
        canSeePrices: boolean;
        id: string;
        name: string;
        salesOrganisation_id: string;
        type: string;
        user_id: string
    }
    export interface Role {
        id: string;
        principalName: string;
    }
}