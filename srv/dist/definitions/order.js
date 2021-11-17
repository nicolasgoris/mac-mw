"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanitizedEntity = exports.Entity = exports.Order = void 0;
var Order;
(function (Order) {
    let Entity;
    (function (Entity) {
        Entity["Address"] = "Order.Address";
        Entity["Addresses"] = "Order.Addresses";
        Entity["LineItem"] = "Order.LineItem";
        Entity["Order"] = "Order.Order";
        Entity["OrderHeader"] = "Order.OrderHeader";
        Entity["OrderTotal"] = "Order.OrderTotal";
        Entity["Package"] = "Order.Package";
        Entity["Payment"] = "Order.Payment";
        Entity["Shipment"] = "Order.Shipment";
    })(Entity = Order.Entity || (Order.Entity = {}));
    let SanitizedEntity;
    (function (SanitizedEntity) {
        SanitizedEntity["Address"] = "Address";
        SanitizedEntity["Addresses"] = "Addresses";
        SanitizedEntity["LineItem"] = "LineItem";
        SanitizedEntity["Order"] = "Order";
        SanitizedEntity["OrderHeader"] = "OrderHeader";
        SanitizedEntity["OrderTotal"] = "OrderTotal";
        SanitizedEntity["Package"] = "Package";
        SanitizedEntity["Payment"] = "Payment";
        SanitizedEntity["Shipment"] = "Shipment";
    })(SanitizedEntity = Order.SanitizedEntity || (Order.SanitizedEntity = {}));
})(Order = exports.Order || (exports.Order = {}));
var Entity;
(function (Entity) {
})(Entity = exports.Entity || (exports.Entity = {}));
var SanitizedEntity;
(function (SanitizedEntity) {
})(SanitizedEntity = exports.SanitizedEntity || (exports.SanitizedEntity = {}));
//# sourceMappingURL=order.js.map