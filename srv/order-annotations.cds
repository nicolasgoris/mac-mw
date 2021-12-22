using Order from './order';

annotate Order.Order with @(
    UI           : {
        SelectionFields                 : [
            SoldToName,
            Status,
        ],
        LineItem                        : [
            {
                $Type             : 'UI.DataField',
                Value             : OrderDate,
                Label             : '{@i18n>orderDate}',
                ![@UI.Importance] : #High,
            },
            {
                $Type             : 'UI.DataField',
                Value             : OrderNr,
                Label             : '{@i18n>orderNr}',
                ![@UI.Importance] : #High,
            },
            {
                $Type             : 'UI.DataField',
                Value             : CustomerReference,
                Label             : '{@i18n>customerRef}',
                ![@UI.Importance] : #Medium,
            },
            {
                $Type             : 'UI.DataField',
                Value             : SoldToName,
                Label             : '{@i18n>soldTo}',
                ![@UI.Importance] : #Medium,
            },
            {
                $Type             : 'UI.DataField',
                Value             : TotalAmount,
                Label             : '{@i18n>totalAmount}',
                ![@UI.Importance] : #Low,
            },
            {
                $Type             : 'UI.DataField',
                Value             : TotalCurrency,
                Label             : '{@i18n>currency}',
                ![@UI.Importance] : #Low,
            },
            {
                $Type             : 'UI.DataField',
                Value             : Status,
                Label             : '{@i18n>status}',
                ![@UI.Importance] : #High,
            },
            {
                $Type : 'UI.DataField',
                Value : SoldTo,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesOrg,
                ![@UI.Hidden]
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_Id,
                ![@UI.Hidden],

            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_Name,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_Street,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_Number,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_Zip,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_City,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_Country,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : DeliveryInformation_CountryCode,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_Id,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_Name,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_Street,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_Number,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_Zip,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_City,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_Country,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : SalesInformation_CountryCode,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Id,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Name,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Street,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Number,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Zip,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_City,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Country,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_CountryCode,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_PaymentTerms,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : PaymentInformation_Currency,
                ![@UI.Hidden],
            },
        ],
        HeaderInfo                      : {
            $Type          : 'UI.HeaderInfoType',
            TypeName       : '{@i18n>order}',
            TypeNamePlural : '{@i18n>orders}',
            Title          : {Value : OrderNr, },
            Description    : {Value : OrderDate, },
        },
        Facets                          : [
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{@i18n>lineItems}',
                Target : 'LineItems/@UI.LineItem',
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{@i18n>deliveries}',
                Target : 'Deliveries/@UI.LineItem',
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{@i18n>deliveryInfo}',
                Target : '@UI.FieldGroup#deliveryInformation',
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{@i18n>salesInfo}',
                Target : '@UI.FieldGroup#salesInformation',
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{@i18n>paymentInfo}',
                Target : '@UI.FieldGroup#paymentInformation',
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{@i18n>invoices}',
                Target : 'Invoices/@UI.LineItem',
            },
        ],
        FieldGroup #salesInformation    : {
            $Type : 'UI.FieldGroupType',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_Name,
                    Label : '{@i18n>name}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_Street,
                    Label : '{@i18n>street}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_Number,
                    Label : '{@i18n>nr}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_City,
                    Label : '{@i18n>city}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_Zip,
                    Label : '{@i18n>zip}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_CountryCode,
                    Label : '{@i18n>countryCode}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : SalesInformation_Country,
                    Label : '{@i18n>country}'
                },
            ],
        },
        FieldGroup #deliveryInformation : {
            $Type : 'UI.FieldGroupType',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_Name,
                    Label : '{@i18n>name}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_Street,
                    Label : '{@i18n>street}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_Number,
                    Label : '{@i18n>nr}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_City,
                    Label : '{@i18n>city}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_Zip,
                    Label : '{@i18n>zip}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_CountryCode,
                    Label : '{@i18n>countryCode}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : DeliveryInformation_Country,
                    Label : '{@i18n>country}'
                },
            ],
        },
        FieldGroup #paymentInformation  : {
            $Type : 'UI.FieldGroupType',
            Data  : [
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_Name,
                    Label : '{@i18n>name}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_Street,
                    Label : '{@i18n>street}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_Number,
                    Label : '{@i18n>nr}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_City,
                    Label : '{@i18n>city}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_Zip,
                    Label : '{@i18n>zip}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_CountryCode,
                    Label : '{@i18n>countryCode}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_Country,
                    Label : '{@i18n>country}'
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_PaymentTerms,
                    Label : '{@i18n>paymentTerms}',
                },
                {
                    $Type : 'UI.DataField',
                    Value : PaymentInformation_Currency,
                    Label : '{@i18n>currency}',
                },
            ],
        },
    },
    Capabilities : {
        SortRestrictions   : {
            $Type                 : 'Capabilities.SortRestrictionsType',
            NonSortableProperties : [
                SoldTo,
                SalesOrg,
                DeliveryInformation_Id,
                DeliveryInformation_Name,
                DeliveryInformation_Street,
                DeliveryInformation_Number,
                DeliveryInformation_Zip,
                DeliveryInformation_City,
                DeliveryInformation_Country,
                DeliveryInformation_CountryCode,
                SalesInformation_Id,
                SalesInformation_Name,
                SalesInformation_Street,
                SalesInformation_Number,
                SalesInformation_Zip,
                SalesInformation_City,
                SalesInformation_Country,
                SalesInformation_CountryCode,
                PaymentInformation_Id,
                PaymentInformation_Name,
                PaymentInformation_Street,
                PaymentInformation_Number,
                PaymentInformation_Zip,
                PaymentInformation_City,
                PaymentInformation_Country,
                PaymentInformation_CountryCode,
                PaymentInformation_PaymentTerms,
                PaymentInformation_Currency,
            ],
        },
        FilterRestrictions : {
            $Type                   : 'Capabilities.FilterRestrictionsType',
            NonFilterableProperties : [
                // DraftAdministrativeData, // Does not do anything :(
                // SoldTo,
                SalesOrg,
                DeliveryInformation_Id,
                DeliveryInformation_Name,
                DeliveryInformation_Street,
                DeliveryInformation_Number,
                DeliveryInformation_Zip,
                DeliveryInformation_City,
                DeliveryInformation_Country,
                DeliveryInformation_CountryCode,
                SalesInformation_Id,
                SalesInformation_Name,
                SalesInformation_Street,
                SalesInformation_Number,
                SalesInformation_Zip,
                SalesInformation_City,
                SalesInformation_Country,
                SalesInformation_CountryCode,
                PaymentInformation_Id,
                PaymentInformation_Name,
                PaymentInformation_Street,
                PaymentInformation_Number,
                PaymentInformation_Zip,
                PaymentInformation_City,
                PaymentInformation_Country,
                PaymentInformation_CountryCode,
                PaymentInformation_PaymentTerms,
                PaymentInformation_Currency,
            ],
        },
    },
);

annotate Order.LineItems with @(
    UI           : {LineItem : [
        {
            $Type : 'UI.DataField',
            Value : Position,
            Label : '{@i18n>position}',
        },
        {
            $Type : 'UI.DataField',
            Value : MaterialNr,
            Label : '{@i18n>matNr}',
        },
        {
            $Type : 'UI.DataField',
            Value : MaterialDescription,
            Label : '{@i18n>matDesc}',
        },
        {
            $Type : 'UI.DataField',
            Value : Quantity,
            Label : '{@i18n>quantity}',
        },
        {
            $Type : 'UI.DataField',
            Value : UnitOfMeasure,
            Label : '{@i18n>uom}',

        },
        {
            $Type : 'UI.DataField',
            Value : ListPrice,
            Label : '{@i18n>listPrice}',
        },
        {
            $Type : 'UI.DataField',
            Value : DiscountPercentage,
            Label : '{@i18n>discountPerc}',
        },
        {
            $Type : 'UI.DataField',
            Value : DiscountAmount,
            Label : '{@i18n>discountAmount}',
        },
        {
            $Type : 'UI.DataField',
            Value : NetPrice,
            Label : '{@i18n>netPrice}',
        },
        {
            $Type : 'UI.DataField',
            Value : TotalAmount,
            Label : '{@i18n>total}',
        },
        {
            $Type : 'UI.DataField',
            Value : Currency,
            Label : '{@i18n>currency}',
        },
        {
            $Type : 'UI.DataField',
            Value : Order_OrderNr,
            ![@UI.Hidden],
        },
    ], },
    Capabilities : {
        SortRestrictions   : {
            $Type                 : 'Capabilities.SortRestrictionsType',
            NonSortableProperties : [Order_OrderNr, ],
        },
        SearchRestrictions : {
            $Type      : 'Capabilities.SearchRestrictionsType',
            Searchable : false,
        },
    },
);

annotate Order.Deliveries with @(
    UI           : {
        LineItem   : [
            {
                $Type : 'UI.DataFieldWithUrl',
                Value : TrackingNr,
                Url   : TrackingUrl,
                Label : '{@i18n>trackingNr}',
            },
            {
                $Type : 'UI.DataField',
                Value : Date,
                Label : '{@i18n>date}',
            },
            {
                $Type : 'UI.DataField',
                Value : TrackingUrl,
                ![@UI.Hidden],
            },
            {
                $Type : 'UI.DataField',
                Value : Order_OrderNr,
                ![@UI.Hidden],
            },
        ],
        HeaderInfo : {
            $Type          : 'UI.HeaderInfoType',
            TypeName       : '{@i18n>delivery}',
            TypeNamePlural : '',
            Title          : {Value : TrackingNr, },
        },
        Facets     : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{@i18n>deliveryItems}',
            Target : 'Items/@UI.LineItem',
        }, ],
    },
    Capabilities : {
        SortRestrictions   : {
            $Type                 : 'Capabilities.SortRestrictionsType',
            NonSortableProperties : [
                Order_OrderNr,
                TrackingUrl,
            ],
        },
        SearchRestrictions : {
            $Type      : 'Capabilities.SearchRestrictionsType',
            Searchable : false,
        },
    }
);

annotate Order.Invoices with @(
    UI           : {LineItem : [
        {
            $Type : 'UI.DataField',
            Value : InvoiceNr,
            Label : '{@i18n>invoiceNr}',
        },
        // {
        //     $Type  : 'UI.DataFieldForAction',
        //     Action : 'Order.getInvoice',
        //     Label  : '{@i18n>downloadInvoice}',
        //     Inline : true,
        // },
        {
            $Type : 'UI.DataField',
            Value : InvoiceUrl,
            Label : '{@i18n>invoiceUrl}'
        },
        {
            $Type : 'UI.DataField',
            Value : Order_OrderNr,
            ![@UI.Hidden],
        },
    ], },
    Capabilities : {
        SortRestrictions   : {
            $Type                 : 'Capabilities.SortRestrictionsType',
            NonSortableProperties : [
                Order_OrderNr,
                InvoiceUrl,
            // Pdf
            ],
        },
        SearchRestrictions : {
            $Type      : 'Capabilities.SearchRestrictionsType',
            Searchable : false,
        },
    },
);

annotate Order.DeliveryItems with @(
    UI           : {LineItem : [
        {
            $Type             : 'UI.DataField',
            Value             : MaterialNr,
            Label             : '{@i18n>matNr}',
            ![@UI.Importance] : #High,
        },
        {
            $Type             : 'UI.DataField',
            Value             : MaterialDescription,
            Label             : '{@i18n>matDesc}',
            ![@UI.Importance] : #High,
        },
        {
            $Type             : 'UI.DataField',
            Value             : Quantity,
            Label             : '{@i18n>quantity}',
            ![@UI.Importance] : #High,
        },
        {
            $Type : 'UI.DataField',
            Value : Delivery_TrackingNr,
            ![@UI.Hidden],
        },
        {
            $Type : 'UI.DataField',
            Value : Delivery_Order_OrderNr,
            ![@UI.Hidden],
        },
    ], },
    Capabilities : {
        SortRestrictions   : {
            $Type                 : 'Capabilities.SortRestrictionsType',
            NonSortableProperties : [
                Delivery_TrackingNr,
                Delivery_Order_OrderNr,
            ],
        },
        SearchRestrictions : {
            $Type      : 'Capabilities.SearchRestrictionsType',
            Searchable : false,
        },
    },
);

annotate Order.Order with {
    SoldToName        @Common : {
        ValueListWithFixedValues,
        Label     : '{@i18n>soldTo}',
        ValueList : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Customer',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterIn',
                    LocalDataProperty : 'SoldTo',
                    ValueListProperty : 'SoldTo'
                },
                {
                    $Type             : 'Common.ValueListParameterDisplayOnly',
                    ValueListProperty : 'SoldToName'
                }
            ]
        },
    };
    Status            @Common : {
        ValueListWithFixedValues,
        Label     : '{@i18n>status}',
        ValueList : {
            $Type          : 'Common.ValueListType',
            CollectionPath : 'Status',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'Status',
                ValueListProperty : 'Status'
            }]
        },
    };
    OrderDate         @Common : {Label : '{@i18n>orderDate}', };
    OrderNr           @Common : {Label : '{@i18n>orderNr}', };
    CustomerReference @Common : {Label : '{@i18n>customerRef}', };
    TotalAmount       @Common : {Label : '{@i18n>totalAmount}', };
    TotalCurrency     @Common : {Label : '{@i18n>currency}', };
};

annotate Order.Deliveries with {
    Date       @Common : {Label : '{@i18n>date}', };
    TrackingNr @Common : {Label : '{@i18n>trackingNr}', };
}

annotate Order.LineItems with {
    Position            @Common : {Label : '{@i18n>position}', };
    MaterialNr          @Common : {Label : '{@i18n>matNr}', };
    MaterialDescription @Common : {Label : '{@i18n>matDesc}', };
    Quantity            @Common : {Label : '{@i18n>quantity}', };
    UnitOfMeasure       @Common : {Label : '{@i18n>uom}', };
    ListPrice           @Common : {Label : '{@i18n>listPrice}', };
    DiscountPercentage  @Common : {Label : '{@i18n>discountPerc}', };
    DiscountAmount      @Common : {Label : '{@i18n>discountAmount}', };
    NetPrice            @Common : {Label : '{@i18n>netPrice}', };
    TotalAmount         @Common : {Label : '{@i18n>total}', };
    Currency            @Common : {Label : '{@i18n>currency}', };
};

annotate Order.Invoices with {
    InvoiceNr @Common : {Label : '{@i18n>invoiceNr}', }
};

annotate Order.DeliveryItems with {
    MaterialNr          @Common : {Label : '{@i18n>matNr}', };
    MaterialDescription @Common : {Label : '{@i18n>matDesc}', };
    Quantity            @Common : {Label : '{@i18n>quantity}', };
};


// annotate Order.Order with @Capabilities.NavigationRestrictions:{
//     RestrictedProperties : [
//         {
//             NavigationProperty : 'DraftAdministrativeData' ,
//             FilterRestrictions : {
//                 Filterable: false,
//             },
//         },
//     ],
// };
