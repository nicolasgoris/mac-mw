export namespace hip {
    export interface IOrder {
        endCustomer: string;
        orderDate: string;
        orderDocumentSAP: string;
        orderCustomerRef: string;
        totalItems: number;
        totalValue: number;
        currency: string;
        status: 'Processing' | 'Confirmed' | 'Shipping' | 'Invoiced' | 'Complete' | 'Cancelled';
        Details?: IOrderDetails;
    }
    export interface IOrderDetails {
        orderHeader: {
            salesOrg: string;
            division: string;
            distributionChannel: string;
            orderDocumentNo: string;
            orderDocumentSAP: string;
            orderCustomerRef: string;
            orderDate: string;
            comment: string;
            requestedDeliveryDate: string;
            orderStatus: string;
        }
        orderTotal: {
            itemTotal: number;
            deliveryTotal: number;
            discounts: [{
                amount: number;
                currency: string;
            }]
            totalTaxesAndFees: number;
            orderListTotal: number;
            orderNetTotal: number;
            currency: string;
        }
        addresses: {
            soldTo: IAddress;
            billTo: IAddress;
            payer: IAddress;
            shipTo: IAddress;
            endCustomer: IAddress;
        }
        lineItems: [{
            position: number;
            sku: string;
            name: string;
            quantity: number;
            unitOfMeasurement: string;
            status: 'Processing' | 'Confirmed' | 'Shipping' | 'Invoiced' | 'Complete' | 'Cancelled';
            estimatedDeliveryDate: string;
            discounts: [{
                percentage: number;
            }]
            listPrice: number;
            listPriceTotal: number;
            netPrice: number;
            netPriceTotal: number;
            currency: string;
        }]
        shipments: [{
            id: string;
            invoiceNumber: string;
            shipmentDate: string;
            packages: [{
                id: string;
                trackingNumber: string;
                trackingLink: string;
                items: [{
                    sku: string;
                    quantity: number;
                }]
            }]
        }]
        payment: {
            method: string;
            paymentTerms: string;
            invoiceLink: [{
                invoiceNumber: string;
                link: string;
            }]
        }
    }
    interface IAddress {
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
    export interface IInvoice {
        
    }
}