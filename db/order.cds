namespace mac.mw.order;

entity Orders {
    key OrderNr              : String;
        OrderDate            : Timestamp;
        WebOrder             : Boolean; // Not available yet
        Status               : String;
        ExpectedDeliveryDate : Date; // Not available yet
        CustomerReference    : String;
        SalesOrg             : String;
        SoldTo               : String;
        SoldToName           : String;
        ShipToCountry        : String; // Not available yet
        ShipToCity           : String; // Not available yet
        TotalAmount          : DecimalFloat;
        TotalCurrency        : String;
        CreatedBy            : String; // Not available yet
        LastModified         : Timestamp
            @cds.on.insert : $now
            @cds.on.update : $now;
        DeliveryInformation  : Address;
        SalesInformation     : Address;
        PaymentInformation   : PaymentInformation;
        LineItems            : Composition of many LineItems
                                   on LineItems.Order = $self;
        Deliveries           : Composition of many Deliveries
                                   on Deliveries.Order = $self;
        Invoices             : Composition of many Invoices
                                   on Invoices.Order = $self;
// LineItems            : Association to many LineItems
//                            on LineItems.OrderNr = $self.OrderNr;
// Deliveries           : Association to many Deliveries
//                            on Deliveries.OrderNr = $self.OrderNr;
// Invoices             : Association to many Invoices
//                            on Invoices.OrderNr = $self.OrderNr;
// Details              : Association to one OrderDetails
//                            on Details.OrderNr = $self.OrderNr;
}

type PaymentInformation : Address {
    Currency     : String;
    PaymentTerms : String;
}

// entity OrderDetails {
//     key OrderNr      : String;
//         // DeliveryInformation : Association to one Address
//         //                           on DeliveryInformation.OrderNr = $self.OrderNr;
//         // SalesInformation    : Association to one Address
//         //                           on SalesInformation.OrderNr = $self.OrderNr;
//         // PaymentInformation  : Association to one Address
//         //                           on PaymentInformation.OrderNr = $self.OrderNr;
//         LastModified : Timestamp
//             @cds.on.insert : $now
//             @cds.on.update : $now;
// }

entity LineItems {
    key Order               : Association to Orders;
    key Position            : Integer;
        MaterialNr          : String(18);
        MaterialDescription : String;
        Quantity            : Integer;
        UnitOfMeasure       : String(2);
        ListPrice           : Integer;
        DiscountPercentage  : Integer;
        DiscountAmount      : Integer;
        NetPrice            : Integer;
        TotalAmount         : Integer;
        Currency            : String(3);
}

entity Deliveries {
    key Order       : Association to Orders;
    key TrackingNr  : String;
        Date        : Date;
        // Status               : String; // Not available yet
        // ExpectedDeliveryDate : Date; // Not available yet
        TrackingUrl : String;
        Items       : Composition of many DeliveryItems
                          on Items.Delivery = $self;
}

entity DeliveryItems {
    key Delivery            : Association to Deliveries;
    key MaterialNr          : String;
        // DeliveryDate        : Date; // Not available yet
        MaterialDescription : String;
        Quantity            : Integer;
}

entity Invoices {
    key Order      : Association to Orders;
    key InvoiceNr  : String;
        InvoiceUrl : String;
        InvoicePdf : String;
}

// entity Address {
//     key OrderNr : String;
//         Id      : String;
//         Name    : String;
//         Street  : String;
//         Number  : String;
//         City    : String;
//         Zip     : String;
//         Country : String;
// }

type Address {
    Id          : String;
    Name        : String;
    Street      : String;
    Number      : String;
    City        : String;
    Zip         : String;
    Country     : String;
    CountryCode : String;
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
