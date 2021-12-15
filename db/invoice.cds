namespace mac.mw.invoice;

entity Invoices {
    InvoiceNr     : String;
    InvoiceDate   : Timestamp;
    Status        : Status;
    DueDate       : Timestamp;
    TotalAmount   : DecimalFloat;
    TotalCurrency : String;
    SoldTo        : String;
    SoldToName    : String;
    ShipTo        : String;
    ShipToName    : String;
    SalesContact  : String;
    @Core.MediaType                   : 'application/pdf'
    @Core.ContentDisposition.Filename : FileName
    Pdf           : LargeBinary;
    FileName      : String;
    LastModified  : Timestamp
        @cds.on.insert :                $now
        @cds.on.update :                $now;
}

type Status : String enum {
    Payed;
    NotPayed;
}
