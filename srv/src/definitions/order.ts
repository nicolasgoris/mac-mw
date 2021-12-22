export namespace mac.mw.order {
    export interface IAddress {
        Id: string;
        Name: string;
        Street: string;
        Number: string;
        City: string;
        Zip: string;
        Country: string;
        CountryCode: string;
    }

    export interface IPaymentInformation {
        Id: string;
        Name: string;
        Street: string;
        Number: string;
        City: string;
        Zip: string;
        Country: string;
        CountryCode: string;
        Currency: string;
        PaymentTerms: string;
    }
}

export namespace Order {
    export interface ICustomer {
        UserName: string;
        SoldTo: string;
        SoldToName: string;
        SalesOrg: string;
    }

    export interface IDeliveries {
        Order?: IOrder;
        Order_OrderNr?: string;
        TrackingNr: string;
        Date: Date;
        TrackingUrl: string;
        Items: IDeliveryItems[];
    }

    export interface IDeliveryItems {
        Delivery?: IDeliveries;
        Delivery_Order?: unknown;
        Delivery_TrackingNr?: string;
        MaterialNr: string;
        MaterialDescription: string;
        Quantity: number;
    }

    export interface IInvoices {
        Order?: IOrder;
        Order_OrderNr?: string;
        InvoiceNr: string;
        InvoiceUrl: string;
        // Pdf: string;
    }

    export interface IInvoice {
        Order_OrderNr: string;
        InvoiceNr: string;
    }

    export interface ILineItems {
        Order?: IOrder;
        Order_OrderNr?: string;
        Position: number;
        MaterialNr: string;
        MaterialDescription: string;
        Quantity: number;
        UnitOfMeasure: string;
        ListPrice: number;
        DiscountPercentage: number;
        DiscountAmount: number;
        NetPrice: number;
        TotalAmount: number;
        Currency: string;
    }

    export interface IOrder {
        OrderNr: string;
        OrderDate: Date;
        Status: string;
        CustomerReference: string;
        SalesOrg: string;
        SoldTo: string;
        SoldToName: string;
        TotalAmount: number;
        TotalCurrency: string;
        DeliveryInformation?: mac.mw.order.IAddress;
        SalesInformation?: mac.mw.order.IAddress;
        PaymentInformation?: mac.mw.order.IPaymentInformation;
        LineItems?: ILineItems[];
        Deliveries?: IDeliveries[];
        Invoices?: IInvoices[];
    }

    export interface IStatus {
        Status: string;
    }

    export enum Entity {
        Deliveries = "mac.mw.order.Deliveries",
        DeliveryItems = "mac.mw.order.DeliveryItems",
        Invoices = "mac.mw.order.Invoices",
        LineItems = "mac.mw.order.LineItems",
        Orders = "mac.mw.order.Orders"
    }
}

export enum Entity {
}

export enum SanitizedEntity {
}
