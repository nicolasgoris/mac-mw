using mac.mw.order as order from '../db/order';

@impl : './dist/order.js'
service Order {
    @readonly
    entity Order as projection on order.Order;
}