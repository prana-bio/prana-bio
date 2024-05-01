import { useState } from 'react';
import { mutate } from 'swr';
import { useUserSession } from '@/app/nucleus/context/user-provider';
import { Tenant } from '@/app/types/Tenant';

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
    const { updateUserSession } = useUserSession();

    const createTenant = async (
        organizationName: string,
    ): Promise<{
        success: boolean;
        message: string;
        tenant?: Tenant;
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

            const resp = await response.json();
            const tenant = resp.data as Tenant;

            updateUserSession((prevSession) => ({
                ...prevSession,
                selectedTenant: tenant,
                tenants: [...prevSession.tenants, tenant],
            }));

            return {
                success: true,
                message: 'Tenant created successfully',
                tenant,
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