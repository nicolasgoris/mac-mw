using Order from './order';

annotate Order.Order with @(UI : {
    SelectionFields                 : [
        SoldTo,
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
});

annotate Order.LineItems with @(UI : {LineItem : [
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
], });

annotate Order.Deliveries with @(UI : {LineItem : [
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

], });

annotate Order.Invoices with @(UI : {LineItem : [
    {
        $Type : 'UI.DataField',
        Value : InvoiceNr,
        Label : '{@i18n>invoiceNr}',
    },
    {
        $Type : 'UI.DataFieldWithUrl',
        Url   : InvoicePdf,
        Value : InvoiceUrl,
    },
], });


annotate Order.Order with {
    SoldTo @Common : {
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
    Status @Common : {
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
};
