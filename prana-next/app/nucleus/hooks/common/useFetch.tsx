import useSWR, { mutate } from 'swr';

/**
 * Custom fetch hook using SWR for data fetching.
 * Provides an abstraction layer over fetch API with built-in caching and revalidation.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} An object containing:
 * - data: The data fetched from the given URL (or undefined if not yet loaded).
 * - isLoading: A boolean indicating if the request is still loading.
 * - isError: Any error that might have occurred during the request.
 */
export const useFetch = (
    url: string,
    fetcherFn: (
        url: string,
        options?: RequestInit,
    ) => Promise<any> = fetcher,
) => {
    const { data, error } = useSWR(url, fetcherFn);
    return {
        data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
};

/**
 * A utility function to fetch data from a given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {Promise<any>} A promise resolving to the fetched data.
 */
const fetcher = async (
    url: string,
    options?: RequestInit,
) => {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(
            'An error occurred while fetching the data.',
        );
    }
    try {
        return await response.json();
    } catch (error) {
        throw new Error('Error parsing JSON');
    }
};
