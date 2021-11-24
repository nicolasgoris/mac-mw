export namespace mac.mw.order {
    export interface IAddress {
        OrderNr: string;
        Id: string;
        Name: string;
        Street: string;
        Number: string;
        City: string;
        Zip: string;
        Country: string;
    }

    export interface ICustomer {
        logonName: string;
        id: string;
        salesOrg: string;
    }

    export interface IDeliveries {
        OrderNr: string;
        Date: Date;
        Status: string;
        ExpectedDeliveryDate: Date;
        TrackingNr: string;
        TrackingUrl: string;
        Items?: IDeliveryItems;
        Items_OrderNr?: string;
        Items_DeliveryDate?: Date;
    }

    export interface IDeliveryItems {
        OrderNr: string;
        DeliveryDate: Date;
        MaterialNr: string;
        MaterialDescription: string;
        Quantity: number;
    }

    export interface IInvoices {
        OrderNr: string;
        InvoiceNr: string;
        InvoiceUrl: string;
        InvoiceBase64: string;
    }

    export interface ILineItems {
        OrderNr: string;
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

    export enum Entity {
        Address = "mac.mw.order.Address",
        Customer = "mac.mw.order.Customer",
        Deliveries = "mac.mw.order.Deliveries",
        DeliveryItems = "mac.mw.order.DeliveryItems",
        Invoices = "mac.mw.order.Invoices",
        LineItems = "mac.mw.order.LineItems"
    }

    export enum SanitizedEntity {
        Address = "Address",
        Customer = "Customer",
        Deliveries = "Deliveries",
        DeliveryItems = "DeliveryItems",
        Invoices = "Invoices",
        LineItems = "LineItems"
    }
}

export namespace Order {
    export interface ICustomer {
        logonName: string;
        id: string;
        salesOrg: string;
    }

    export interface IDeliveries {
        OrderNr: string;
        Date: Date;
        Status: string;
        ExpectedDeliveryDate: Date;
        TrackingNr: string;
        TrackingUrl: string;
        Items?: IItems;
        Items_OrderNr?: string;
        Items_DeliveryDate?: Date;
    }

    export interface IInvoices {
        OrderNr: string;
        InvoiceNr: string;
        InvoiceUrl: string;
        InvoiceBase64: string;
    }

    export interface IItems {
        OrderNr: string;
        DeliveryDate: Date;
        MaterialNr: string;
        MaterialDescription: string;
        Quantity: number;
    }

    export interface ILineItem {
        OrderNr: string;
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
        WebOrder?: boolean;
        Status: string;
        ExpectedDeliveryDate?: Date;
        CustomerReference: string;
        SalesOrg: string;
        SoldTo: string;
        ShipToCountry?: string;
        ShipToCity?: string;
        TotalAmount: number;
        TotalCurrency: string;
        CreatedBy?: string;
        Details?: IOrderDetails;
        Details_OrderNr?: string;
    }

    export interface IOrderDetails {
        OrderNr: string;
        LineItems?: ILineItem;
        LineItems_OrderNr?: string;
        LineItems_Position?: number;
        Deliveries?: IDeliveries;
        Deliveries_OrderNr?: string;
        DeliveryInformation?: IPaymentInformation;
        DeliveryInformation_OrderNr?: string;
        SalesInformation?: IPaymentInformation;
        SalesInformation_OrderNr?: string;
        PaymentInformation?: IPaymentInformation;
        PaymentInformation_OrderNr?: string;
        Invoices?: IInvoices;
        Invoices_OrderNr?: string;
    }

    export interface IPaymentInformation {
        OrderNr: string;
        Id: string;
        Name: string;
        Street: string;
        Number: string;
        City: string;
        Zip: string;
        Country: string;
    }

    export interface IOrderDetails {
        OrderNr: string;
        LineItems?: mac.mw.order.ILineItems;
        LineItems_OrderNr?: string;
        LineItems_Position?: number;
        Deliveries?: mac.mw.order.IDeliveries;
        Deliveries_OrderNr?: string;
        DeliveryInformation?: mac.mw.order.IAddress;
        DeliveryInformation_OrderNr?: string;
        SalesInformation?: mac.mw.order.IAddress;
        SalesInformation_OrderNr?: string;
        PaymentInformation?: mac.mw.order.IAddress;
        PaymentInformation_OrderNr?: string;
        Invoices?: mac.mw.order.IInvoices;
        Invoices_OrderNr?: string;
    }

    export interface IOrders {
        OrderNr: string;
        OrderDate: Date;
        WebOrder: boolean;
        Status: string;
        ExpectedDeliveryDate: Date;
        CustomerReference: string;
        SalesOrg: string;
        SoldTo: string;
        ShipToCountry: string;
        ShipToCity: string;
        TotalAmount: number;
        TotalCurrency: string;
        CreatedBy: string;
        Details?: IOrderDetails;
        Details_OrderNr?: string;
    }

    export enum Entity {
        Customer = "Order.Customer",
        Deliveries = "Order.Deliveries",
        Invoices = "Order.Invoices",
        Items = "Order.Items",
        LineItem = "Order.LineItem",
        Order = "Order.Order",
        OrderDetails = "mac.mw.order.OrderDetails",
        PaymentInformation = "Order.PaymentInformation",
        Orders = "mac.mw.order.Orders"
    }

    export enum SanitizedEntity {
        Customer = "Customer",
        Deliveries = "Deliveries",
        Invoices = "Invoices",
        Items = "Items",
        LineItem = "LineItem",
        Order = "Order",
        OrderDetails = "OrderDetails",
        PaymentInformation = "PaymentInformation",
        Orders = "Orders"
    }
}

export enum Entity {
}

export enum SanitizedEntity {
}
