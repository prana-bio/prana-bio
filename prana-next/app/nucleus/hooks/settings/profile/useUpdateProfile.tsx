import { useState } from 'react';
import { mutate } from 'swr';

import { User } from '@/app/types/User';

/**
 * Custom hook for updating user (public) profile data.
 * Handles sending a PATCH request to update user data and managing the response.
 *
 * @returns {Object} An object containing:
 * - updateUser: A function to call for updating user data. It takes a User object as an argument.
 * - isLoading: A boolean indicating if the update request is still processing.
 * - error: A string representing an error message, if any error occurred during the update.
 */
const useUpdateProfile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateProfile = async (
        data: Partial<User>,
    ): Promise<UpdateProfileResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                '/api/settings/profile',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                },
            );

            if (!response.ok) {
                const errorText = await response.text();
                const message = `Profile update failed: ${
                    response.status
                } ${errorText || response.statusText}`;
                throw new Error(message);
            }

            const { updatedUser } = await response.json();

            // Update the SWR cache
            mutate(
                '/api/settings/profile',
                updatedUser,
                false,
            );

            return {
                success: true,
                message: 'Profile updated successfully',
                updatedUser,
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

    return { updateProfile, isLoading, error };
};

export default useUpdateProfile;

type UpdateProfileResponse = {
    success: boolean;
    message: string;
    updatedUser?: Partial<User>;
};
