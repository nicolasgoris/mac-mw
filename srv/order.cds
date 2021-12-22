using mac.mw.order as order from '../db/order';

@impl : './dist/order.js'
service Order @(requires : 'authenticated-user') {
    @readonly
    entity Customer {
        UserName   : String;
        SoldTo     : String;
        SoldToName : String;
        SalesOrg   : String;
    };

    @readonly
    entity Status as projection on order.Status;

    @readonly
    entity Order    as projection on order.Orders excluding {
        WebOrder,
        ExpectedDeliveryDate,
        ShipToCountry,
        ShipToCity,
        CreatedBy,
        LastModified
    // } actions {
    //     function getInvoice(orderNr : String, invoiceNr : String) returns String
    }

    // entity Invoices as projection on order.Invoices actions {
    //     action getInvoice() returns Binary;
    // };
}