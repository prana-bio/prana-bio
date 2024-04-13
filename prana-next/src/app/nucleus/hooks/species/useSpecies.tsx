/* Species Data Fetcher */

import useSWR, { SWRResponse } from 'swr';
import { Species } from '@/app/types/deprecated/Species';

// SWR Boilerplate
const fetcher = (url: string) =>
    fetch(url).then((res) => res.json());

const useSpecies = (
    offset: number,
): SWRResponse<Species[], any, any> => {
    const { data, error, isLoading, isValidating, mutate } =
        useSWR<Species[], any>(
            `/api/species/?offset=${offset.toFixed()}`,
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

export default useSpecies;
