export type Tenant = {
    id?: string;
    name: string;
    type?: string;
    roles?: Array<string>;
    stripe_customer_id?: string;
    stripe_card_payment_method_id?: string;
    default_tenant?: Boolean;
    default_country_id?: string;
    picture?: string;
    created?: Date;
    updated?: Date;
    deleted?: Date;
};
