import { useState } from 'react';
import { mutate } from 'swr';

import { User } from '@/app/types/User';

const useUpdateNotifications = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateNotifications = async (
        data: Partial<User>,
    ): Promise<UpdateNotificationsResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                '/api/settings/notifications',
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
                const message = `Notifications update failed: ${
                    response.status
                } ${errorText || response.statusText}`;
                throw new Error(message);
            }

            const updatedUser = await response.json();

            // Update the SWR cache
            mutate(
                '/api/settings/notifications',
                updatedUser,
                false,
            );

            return {
                success: true,
                message:
                    'Notifications updated successfully',
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

    return { updateNotifications, isLoading, error };
};

export default useUpdateNotifications;

type UpdateNotificationsResponse = {
    success: boolean;
    message: string;
    updatedUser?: Partial<User>;
};
