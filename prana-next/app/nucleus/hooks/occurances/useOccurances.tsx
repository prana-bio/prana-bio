/* Occurances Data Fetcher */

import useSWR, { SWRResponse } from 'swr';
import { CountryOccurances } from '@/app/types/CountryOccurances';

// SWR Boilerplate
const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

const useCountryOccurances = (): SWRResponse<
    CountryOccurances,
    any,
    any
> => {
    const { data, error, isLoading, isValidating, mutate } =
        useSWR<CountryOccurances, any>(
            `/api/countryoccurances`,
            fetcher,
            {
                revalidateOnFocus: false,
                revalidateOnReconnect: false,
            },
        );
    return {
        data: data,
        error: error,
        isLoading: isLoading,
        isValidating: isValidating,
        mutate: mutate,
    };
};

export default useCountryOccurances;
