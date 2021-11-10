namespace mac.mw.order;

entity Order {
    key orderDocumentSAP : String;
        soldTo           : String;
        salesOrg         : String;
        fromDate         : String;
        toDate           : String;
        endCustomer      : String;
        orderType        : String;
        orderCustomerRef : String;
        orderDate        : Date;
        totalItems       : Integer;
        totalValue       : DecimalFloat;
        currency         : String;
        status           : String;
        orderHeader      : Association to one OrderHeader
                               on orderHeader.orderDocumentSAP = $self.orderDocumentSAP;
        orderTotal       : Association to one OrderTotal
                               on orderTotal.orderDocumentSAP = $self.orderDocumentSAP;
        addresses        : Association to one Addresses
                               on addresses.orderDocumentSAP = $self.orderDocumentSAP;
        lineItems        : Association to many LineItem
                               on lineItems.orderDocumentSAP = $self.orderDocumentSAP;
        shipments        : Association to many Shipment
                               on shipments.orderDocumentSAP = $self.orderDocumentSAP;
        payment          : Association to one Payment
                               on payment.orderDocumentSAP = $self.orderDocumentSAP;
}

entity OrderHeader {
        salesOrg              : String;
        division              : String;
        distributionChannel   : String;
        orderDocumentNo       : String;
    key orderDocumentSAP      : String;
        orderCustomerRef      : String;
        orderDate             : Date;
        comment               : String;
        requestedDeliveryDate : Date;
        orderStatus           : String;
}

entity OrderTotal {
    key orderDocumentSAP  : String;
        itemTotal         : Integer;
        deliveryTotal     : Double;
        discounts         : array of {
            amount        : Double;
            currency      : String;
        };
        totalTaxesAndFees : Double;
        orderListTotal    : Double;
        orderNetTotal     : Double;
        currency          : String;
}

entity Addresses {
    key orderDocumentSAP : String;
        soldTo           : Address;
        billTo           : Address;
        payer            : Address;
        shipTo           : Address;
        endCustomer      : Address;
}

entity LineItem {
    key orderDocumentSAP      : String;
        position              : Integer;
        sku                   : String;
        name                  : String;
        quantity              : Integer;
        unitOfMeasurement     : String;
        status                : String;
        estimatedDeliveryDate : Date;
        discounts             : array of {
            percentage        : Double;
        };
        listPrice             : Double;
        listPriceTotal        : Double;
        netPrice              : Double;
        netPriceTotal         : Double;
        currency              : String;
}

entity Shipment {
    key orderDocumentSAP : String;
        id               : String;
        invoiceNumber    : String;
        shipmentDate     : DateTime;
}

entity Package {
    key orderDocumentSAP : String;
        id               : String;
        trackingNumber   : String;
        trackingLink     : String;
        items            : array of {
            sku          : String;
            quantity     : Integer
        };
}

entity Payment {
    key orderDocumentSAP  : String;
        method            : String;
        paymentTerms      : String;
        invoiceLink       : array of {
            invoiceNumber : String;
            link          : String;
        }
}

type Address {
    id          : String;
    name        : String;
    street1     : String;
    houseNumber : String;
    city        : String;
    region      : String;
    regionCode  : String;
    country     : String;
    countryCode : String;
    postalCode  : String;
}
