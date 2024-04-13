'use client';
import { Elements } from '@stripe/react-stripe-js';
import { useStripeClient } from '@/app/nucleus/hooks/settings/payments/useStripeClient';
import { PaymentForm } from '@/app/components/organisms/settings/payment-form';

export const PaymentFormWrapper = () => {
    const stripe = useStripeClient();
    return stripe ? (
        <Elements stripe={stripe}>
            <PaymentForm />
        </Elements>
    ) : (
        <div>Loading Stripe...</div>
    );
};
