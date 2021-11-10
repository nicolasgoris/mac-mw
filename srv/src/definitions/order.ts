export namespace Order {
    export interface IAddress {
        id: string;
        name: string;
        street1: string;
        houseNumber: string;
        city: string;
        region: string;
        regionCode: string;
        country: string;
        countryCode: string;
        postalCode: string;
    }

    export interface IAddresses {
        orderDocumentSAP: string;
        soldTo: IAddress;
        billTo: IAddress;
        payer: IAddress;
        shipTo: IAddress;
        endCustomer: IAddress;
    }

    export interface ILineItem {
        orderDocumentSAP: string;
        position: number;
        sku: string;
        name: string;
        quantity: number;
        unitOfMeasurement: string;
        status: string;
        estimatedDeliveryDate: Date;
        discounts: unknown[];
        listPrice: number;
        listPriceTotal: number;
        netPrice: number;
        netPriceTotal: number;
        currency: string;
    }

    export interface IOrder {
        orderDocumentSAP: string;
        soldTo: string;
        salesOrg: string;
        fromDate: string;
        toDate: string;
        endCustomer: string;
        orderType: string;
        orderCustomerRef: string;
        orderDate: Date;
        totalItems: number;
        totalValue: number;
        currency: string;
        status: string;
        orderHeader?: IOrderHeader;
        orderHeader_orderDocumentSAP?: string;
        orderTotal?: IOrderTotal;
        orderTotal_orderDocumentSAP?: string;
        addresses?: IAddresses;
        addresses_orderDocumentSAP?: string;
        lineItems?: ILineItem[];
        shipments?: IShipment[];
        payment?: IPayment;
        payment_orderDocumentSAP?: string;
    }

    export interface IOrderHeader {
        salesOrg: string;
        division: string;
        distributionChannel: string;
        orderDocumentNo: string;
        orderDocumentSAP: string;
        orderCustomerRef: string;
        orderDate: Date;
        comment: string;
        requestedDeliveryDate: Date;
        orderStatus: string;
    }

    export interface IOrderTotal {
        orderDocumentSAP: string;
        itemTotal: number;
        deliveryTotal: number;
        discounts: unknown[];
        totalTaxesAndFees: number;
        orderListTotal: number;
        orderNetTotal: number;
        currency: string;
    }

    export interface IPackage {
        orderDocumentSAP: string;
        id: string;
        trackingNumber: string;
        trackingLink: string;
        items: unknown[];
    }

    export interface IPayment {
        orderDocumentSAP: string;
        method: string;
        paymentTerms: string;
        invoiceLink: unknown[];
    }

    export interface IShipment {
        orderDocumentSAP: string;
        id: string;
        invoiceNumber: string;
        shipmentDate: Date;
    }

    export enum Entity {
        Address = "Order.Address",
        Addresses = "Order.Addresses",
        LineItem = "Order.LineItem",
        Order = "Order.Order",
        OrderHeader = "Order.OrderHeader",
        OrderTotal = "Order.OrderTotal",
        Package = "Order.Package",
        Payment = "Order.Payment",
        Shipment = "Order.Shipment"
    }

    export enum SanitizedEntity {
        Address = "Address",
        Addresses = "Addresses",
        LineItem = "LineItem",
        Order = "Order",
        OrderHeader = "OrderHeader",
        OrderTotal = "OrderTotal",
        Package = "Package",
        Payment = "Payment",
        Shipment = "Shipment"
    }
}

export enum Entity {
}

export enum SanitizedEntity {
}
