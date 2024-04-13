import { useState } from 'react';
import { mutate } from 'swr';

import { User } from '@/app/types/User';

const useUploadProfilePicture = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const uploadProfilePicture = async (
        file: File,
    ): Promise<UploadProfilePictureResponse> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `/api/settings/profile/profile-picture?filename=${file.name}`,
                {
                    method: 'POST',
                    body: file,
                },
            );
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(
                    `Upload failed: ${response.status} ${
                        errorText || response.statusText
                    }`,
                );
            }
            const blob = await response.json();
            const imageUrl = blob.url;

            // Update the SWR cache if necessary
            mutate(
                '/api/settings/profile',
                (currentUser: User | undefined) => {
                    return currentUser
                        ? {
                              ...currentUser,
                              picture: imageUrl,
                          }
                        : currentUser;
                },
                false,
            );
            return {
                success: true,
                message:
                    'Profile picture uploaded successfully',
                imageUrl: imageUrl,
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

    return { uploadProfilePicture, isLoading, error };
};

export default useUploadProfilePicture;

type UploadProfilePictureResponse = {
    success: boolean;
    message: string;
    imageUrl?: string;
};
