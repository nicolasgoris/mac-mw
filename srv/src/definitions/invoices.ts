export namespace mac.mw.invoice {
    export enum Status {
        Payed,
        NotPayed
    }
}

export namespace Invoice {
    export interface ICustomer {
        UserName: string;
        SoldTo: string;
        SoldToName: string;
        SalesOrg: string;
    }

    export interface IInvoice {
        InvoiceNr: string;
        InvoiceDate: Date;
        Status: mac.mw.invoice.Status;
        DueDate: Date;
        TotalAmount: number;
        TotalCurrency: string;
        SoldTo: string;
        SoldToName: string;
        ShipTo: string;
        ShipToName: string;
        SalesContact: string;
        Pdf: Buffer;
        FileName: string;
    }

    export interface IStatus {
        Status: string;
    }
}