namespace mac.mw.order;

entity Customer {
    key logonName : String;
    key id        : String;
    key salesOrg  : String;
}

entity Orders {
    key OrderNr              : String;
        OrderDate            : Date;
        WebOrder             : Boolean;
        Status               : String;
        ExpectedDeliveryDate : Date;
        CustomerReference    : String;
        SalesOrg             : String;
        SoldTo               : String;
        ShipToCountry        : String;
        ShipToCity           : String;
        TotalAmount          : DecimalFloat;
        TotalCurrency        : String;
        CreatedBy            : String;
        Details              : Association to OrderDetails;
}

entity OrderDetails {
    key OrderNr             : String;
        LineItems           : Association to LineItems;
        Deliveries          : Association to Deliveries;
        DeliveryInformation : Association to Address;
        SalesInformation    : Association to Address;
        PaymentInformation  : Association to Address;
        Invoices            : Association to Invoices;
}

entity LineItems {
    key OrderNr             : String;
    key Position            : Integer;
        MaterialNr          : String;
        MaterialDescription : String;
        Quantity            : Integer;
        UnitOfMeasure       : String;
        ListPrice           : Integer;
        DiscountPercentage  : Integer;
        DiscountAmount      : Integer;
        NetPrice            : Integer;
        TotalAmount         : Integer;
        Currency            : String;
}

entity Deliveries {
    key OrderNr              : String;
        Date                 : Date;
        Status               : String;
        ExpectedDeliveryDate : Date;
        TrackingNr           : String;
        TrackingUrl          : String;
        Items                : Association to DeliveryItems;
}

entity DeliveryItems {
    key OrderNr             : String;
    key DeliveryDate        : Date;
        MaterialNr          : String;
        MaterialDescription : String;
        Quantity            : Integer;
}

entity Invoices {
    key OrderNr       : String;
        InvoiceNr     : String;
        InvoiceUrl    : String;
        InvoiceBase64 : String;
}

entity Address {
    key OrderNr : String;
        Id      : String;
        Name    : String;
        Street  : String;
        Number  : String;
        City    : String;
        Zip     : String;
        Country : String;
}

// entity Order {
//     key orderDocumentSAP : String;
//         soldTo           : String;
//         salesOrg         : String;
//         fromDate         : String;
//         toDate           : String;
//         endCustomer      : String;
//         orderType        : String;
//         orderCustomerRef : String;
//         orderDate        : Date;
//         totalItems       : Integer;
//         totalValue       : DecimalFloat;
//         currency         : String;
//         status           : String;
//         orderHeader      : Association to one OrderHeader
//                                on orderHeader.orderDocumentSAP = $self.orderDocumentSAP;
//         orderTotal       : Association to one OrderTotal
//                                on orderTotal.orderDocumentSAP = $self.orderDocumentSAP;
//         addresses        : Association to one Addresses
//                                on addresses.orderDocumentSAP = $self.orderDocumentSAP;
//         lineItems        : Association to many LineItem
//                                on lineItems.orderDocumentSAP = $self.orderDocumentSAP;
//         shipments        : Association to many Shipment
//                                on shipments.orderDocumentSAP = $self.orderDocumentSAP;
//         payment          : Association to one Payment
//                                on payment.orderDocumentSAP = $self.orderDocumentSAP;
// }

// entity OrderHeader {
//         salesOrg              : String;
//         division              : String;
//         distributionChannel   : String;
//         orderDocumentNo       : String;
//     key orderDocumentSAP      : String;
//         orderCustomerRef      : String;
//         orderDate             : Date;
//         comment               : String;
//         requestedDeliveryDate : Date;
//         orderStatus           : String;
// }

// entity OrderTotal {
//     key orderDocumentSAP  : String;
//         itemTotal         : Integer;
//         deliveryTotal     : Double;
//         discounts         : array of {
//             amount        : Double;
//             currency      : String;
//         };
//         totalTaxesAndFees : Double;
//         orderListTotal    : Double;
//         orderNetTotal     : Double;
//         currency          : String;
// }

// entity Addresses {
//     key orderDocumentSAP : String;
//         soldTo           : Association to one Address
//                                on soldTo.orderDocumentSAP = $self.orderDocumentSAP;
//         billTo           : Association to one Address
//                                on billTo.orderDocumentSAP = $self.orderDocumentSAP;
//         payer            : Association to one Address
//                                on payer.orderDocumentSAP = $self.orderDocumentSAP;
//         shipTo           : Association to one Address
//                                on shipTo.orderDocumentSAP = $self.orderDocumentSAP;
//         endCustomer      : Association to one Address
//                                on endCustomer.orderDocumentSAP = $self.orderDocumentSAP;
// }

// entity LineItem {
//     key orderDocumentSAP      : String;
//         position              : Integer;
//         sku                   : String;
//         name                  : String;
//         quantity              : Integer;
//         unitOfMeasurement     : String;
//         status                : String;
//         estimatedDeliveryDate : Date;
//         discounts             : array of {
//             percentage        : Double;
//         };
//         listPrice             : Double;
//         listPriceTotal        : Double;
//         netPrice              : Double;
//         netPriceTotal         : Double;
//         currency              : String;
// }

// entity Shipment {
//     key orderDocumentSAP : String;
//         id               : String;
//         invoiceNumber    : String;
//         shipmentDate     : DateTime;
//         packages         : array of Package;
// }

// type Package {
//     id             : String;
//     trackingNumber : String;
//     trackingLink   : String;
//     items          : array of {
//         sku        : String;
//         quantity   : Integer
//     };
// }

// entity Payment {
//     key orderDocumentSAP  : String;
//         method            : String;
//         paymentTerms      : String;
//         invoiceLink       : array of {
//             invoiceNumber : String;
//             link          : String;
//         }
// }

// entity Address {
//     key orderDocumentSAP : String;
//         id               : String;
//         name             : String;
//         street1          : String;
//         houseNumber      : String;
//         city             : String;
//         region           : String;
//         regionCode       : String;
//         country          : String;
//         countryCode      : String;
//         postalCode       : String;
// }
