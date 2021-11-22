export namespace mac.mw.order {
    export interface IAddress {
        name: string;
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

    export interface IDelivery {
        Date: Date;
        Status: string;
        ExpectedDeliveryDate: Date;
        TrackingNr: string;
        TrackingUrl: string;
    }

    export interface IDeliveryItem {
        MaterialNr: string;
        MaterialDescription: string;
        Quantity: number;
    }

    export enum Entity {
        Address = "mac.mw.order.Address",
        Customer = "mac.mw.order.Customer",
        Delivery = "mac.mw.order.Delivery",
        DeliveryItem = "mac.mw.order.DeliveryItem"
    }

    export enum SanitizedEntity {
        Address = "Address",
        Customer = "Customer",
        Delivery = "Delivery",
        DeliveryItem = "DeliveryItem"
    }
}

export namespace Order {
    export interface ICustomer {
        logonName: string;
        id: string;
        salesOrg: string;
    }

    export interface IOrder {
        OrderNr: string;
        OrderDate: Date;
        WebOrder: boolean;
        Status: string;
        ExpectedDeliveryDate: Date;
        CustomerReference: string;
        SoldTo: string;
        ShipToCountry: string;
        ShipToCity: string;
        TotalAmount: number;
        TotalCurrency: string;
        CreatedBy: string;
        LineItems?: IOrderLineItem;
        LineItems_OrderNr?: string;
        LineItems_Position?: number;
    }

    export interface IOrderLineItem {
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
        WebOrder: boolean;
        Status: string;
        ExpectedDeliveryDate: Date;
        CustomerReference: string;
        SoldTo: string;
        ShipToCountry: string;
        ShipToCity: string;
        TotalAmount: number;
        TotalCurrency: string;
        CreatedBy: string;
        LineItems?: IOrderLineItem;
        LineItems_OrderNr?: string;
        LineItems_Position?: number;
    }

    export interface IOrderLineItem {
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
        Customer = "Order.Customer",
        Order = "mac.mw.order.Order",
        OrderLineItem = "mac.mw.order.OrderLineItem"
    }

    export enum SanitizedEntity {
        Customer = "Customer",
        Order = "Order",
        OrderLineItem = "OrderLineItem"
    }
}

export enum Entity {
}

export enum SanitizedEntity {
}
