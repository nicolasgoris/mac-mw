using mac.mw.invoice as invoice from '../db/invoice';

@impl : './dist/invoice.js'
service Invoice @(requires : 'authenticated-user') {
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
    entity Invoice as projection on invoice.Invoices excluding {
        LastModified
    }
}