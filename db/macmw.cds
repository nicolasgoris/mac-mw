// service macmw @(requires : 'authenticated-user') {
//     entity Order {
//         key OrderNr              : String;
//             OrderDate            : Date;
//             WebOrder             : Boolean;
//             Status               : String;
//             ExpectedDeliveryDate : Date;
//             CustomerReference    : String;
//             SoldTo               : String;
//             ShipToCountry        : String;
//             ShipToCity           : String;
//             TotalAmount          : DecimalFloat;
//             TotalCurrency        : String;
//             CreatedBy            : String;
//             LineItems            : Association to many OrderLineItem;
//     }

//     entity OrderLineItem {
//         OrderNr             : String;
//         Position            : Integer;
//         MaterialNr          : String;
//         MaterialDescription : String;
//         Quantity            : Integer;
//         UnitOfMeasure       : String;
//         ListPrice           : Integer;
//         DiscountPercentage  : Integer;
//         DiscountAmount      : Integer;
//         NetPrice            : Integer;
//         TotalAmount         : Integer;
//         Currency            : String;
//     }

//     type Delivery {
//         Date                 : Date;
//         Status               : String;
//         ExpectedDeliveryDate : Date;
//         TrackingNr           : String;
//         TrackingUrl          : String;
//     }

//     type DeliveryItem {
//         MaterialNr          : String;
//         MaterialDescription : String;
//         Quantity            : Integer;
//     }

//     type Address {
//         name    : String;
//         Street  : String;
//         Number  : String;
//         City    : String;
//         Zip     : String;
//         Country : String;
//     }
// }
