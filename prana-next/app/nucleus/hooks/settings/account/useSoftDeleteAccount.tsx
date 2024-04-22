import { useState } from 'react';
import { mutate } from 'swr';

/**
 * Custom hook for performing a soft delete on a users account.
 * This sends a DELETE request to mark the user as deleted without removing the record from the database.
 * Only accessible to users with 'Admin' role.
 *
 * @returns {Object} An object containing:
 * - softDeleteAccount: A function to call for soft deleting a user. It takes a userId as an argument.
 * - isLoading: A boolean indicating if the delete request is still processing.
 * - error: A string representing an error message, if any error occurred during the soft deletion.
 */
const useSoftDeleteAccount = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const softDeleteAccount =
        async (): Promise<SoftDeleteAccountResponse> => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `/api/settings/account`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type':
                                'application/json',
                        },
                    },
                );

                if (!response.ok) {
                    const errorText = await response.text();
                    const message = `Soft delete failed: ${
                        response.status
                    } ${errorText || response.statusText}`;
                    throw new Error(message);
                }

                const result = await response.json();

                // Update the SWR cache
                mutate('/api/settings/account');

                return {
                    success: true,
                    message:
                        result.message ||
                        'User account marked as deleted successfully',
                };
            } catch (err) {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'An unknown error occurred';
                setError(message);
                return { success: false, message };
            } finally {
                setIsLoading(false);
            }
        };

    return { softDeleteAccount, isLoading, error };
};

export default useSoftDeleteAccount;

type SoftDeleteAccountResponse = {
    success: boolean;
    message: string;
};
