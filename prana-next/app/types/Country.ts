export interface Country {
    country_id: string;
    country_name: string;
    country_code?: number;
    iso_alpha2?: string;
    iso_alpha3?: string;
    region?: string;
    sub_region?: string;
}
