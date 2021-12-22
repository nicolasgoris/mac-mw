namespace mac.mw.order;

entity Orders {
    key OrderNr              : String;
        OrderDate            : Timestamp;
        WebOrder             : Boolean; // Not available yet
        Status               : String;
        ExpectedDeliveryDate : Timestamp; // Not available yet
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
}

type PaymentInformation : Address {
    Currency     : String;
    PaymentTerms : String;
}

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
        Date        : Timestamp;
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
// @Core.MediaType                   : 'application/pdf'
// @Core.ContentDisposition.Filename : InvoiceUrl
// Pdf        : LargeBinary;
}

entity Status {
    Status : String;
}

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
