import { useState } from 'react';
import { mutate } from 'swr';

import { Tenant } from '@/app/types/Tenant';

const useUpdateCardPaymentMethod = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateCardPaymentMethod = async (
        paymentMethodId: string,
    ): Promise<UpdateCardPaymentMethodResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                '/api/settings/payments/save-card-payment-method',
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        paymentMethodId: paymentMethodId,
                    }),
                },
            );
            if (!response.ok) {
                const errorText = await response.text();
                const message = `Failed to Save Card Payment: ${
                    response.status
                } ${errorText || response.statusText}`;
                throw new Error(message);
            }

            const updatedTenant = await response.json();

            // Update the SWR cache
            mutate(
                '/api/settings/payments/save-card-payment-method',
                updatedTenant,
                false,
            );

            return {
                success: true,
                message: 'Card Payment Method Saved.',
                updatedTenant,
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

    return { updateCardPaymentMethod, isLoading, error };
};

export default useUpdateCardPaymentMethod;

type UpdateCardPaymentMethodResponse = {
    success: boolean;
    message: string;
    updatedTenant?: Partial<Tenant>;
};
