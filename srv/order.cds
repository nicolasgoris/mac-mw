using mac.mw.order as order from '../db/order';

@impl : './dist/order.js'
service Order @(requires : 'authenticated-user') {
    @readonly
    entity Customer     as projection on order.Customer;

    @readonly
    entity Order        as projection on order.Orders;

    @readonly
    entity OrderDetails as projection on order.OrderDetails;

    @readonly
    entity LineItem     as projection on order.LineItems;
    @readonly
    entity Invoices as projection on order.Invoices;
    @readonly
    entity Deliveries as projection on order.Deliveries;
    @readonly
    entity Items as projection on order.DeliveryItems;
    @readonly
    entity PaymentInformation as projection on order.Address;

// @readonly
// entity OrderHeader as projection on order.OrderHeader;

// @readonly
// entity OrderTotal  as projection on order.OrderTotal;

// @readonly
// entity Addresses   as projection on order.Addresses;

// @readonly
// entity soldTo      as projection on order.Address;

// @readonly
// entity LineItem    as projection on order.LineItem;

// @readonly
// entity Shipment    as projection on order.Shipment;

// @readonly
// entity Payment     as projection on order.Payment;
}
