import useSWR, { SWRResponse } from 'swr';
import { OccurancesGeo } from '@/app/types/OccurancesGeo';

// SWR Boilerplate
const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

const useOccurancesGeo = (): SWRResponse<
    OccurancesGeo,
    any,
    any
> => {
    const geojsonUrl = '/CountryOccurances.geojson';

    const { data, error, isLoading, isValidating, mutate } =
        useSWR<OccurancesGeo, any>(geojsonUrl, fetcher, {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        });

    return {
        data: data,
        error: error,
        isLoading: isLoading,
        isValidating: isValidating,
        mutate: mutate,
    };
};

export default useOccurancesGeo;
