import { Country } from '@/app/types/Country';

export type DashboardFilters = {
    country: Country | undefined;
    propertySelected?: string;
    mapCountrySelected?: string | null;
};
