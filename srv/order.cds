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
    entity Status {
        Status : String;
    }

    @readonly
    entity Order      as projection on order.Orders excluding {
        WebOrder,
        ExpectedDeliveryDate,
        ShipToCountry,
        ShipToCity,
        CreatedBy,
        LastModified
    };

    // @readonly
    // entity LineItem   as projection on order.LineItems;

    // @readonly
    // entity Invoice   as projection on order.Invoices;

    // @readonly
    // entity Deliverie as projection on order.Deliveries;

    // @readonly
    // entity Item      as projection on order.DeliveryItems;
}
