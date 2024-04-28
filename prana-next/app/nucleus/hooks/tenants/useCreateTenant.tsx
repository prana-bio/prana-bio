import { useState } from 'react';
import { mutate } from 'swr';

/**
 * Custom hook for creating a new tenant (organization).
 * Handles sending a POST request to create a tenant and managing the response.
 *
 * @returns {Object} An object containing:
 * - createTenant: A function to call for creating a tenant. It takes an organization name as an argument.
 * - isLoading: A boolean indicating if the creation request is still processing.
 * - error: A string representing an error message, if any error occurred during the creation.
 */
const useCreateTenant = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTenant = async (
        organizationName: string,
    ): Promise<{
        success: boolean;
        message: string;
        tenantId?: string;
    }> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                '/api/organization',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        organizationName,
                    }),
                },
            );

            if (!response.ok) {
                const error = await response.json();
                const message = error.error;
                throw new Error(message);
            }

            const { tenantId } = await response.json();

            return {
                success: true,
                message: 'Tenant created successfully',
                tenantId,
            };
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'An unknown error occurred';
            setError(message);
            return { success: false, message: message };
        } finally {
            setIsLoading(false);
        }
    };

    return { createTenant, isLoading, error };
};

export default useCreateTenant;
