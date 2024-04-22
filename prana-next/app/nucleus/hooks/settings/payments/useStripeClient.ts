import Stripe, { loadStripe } from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

let stripePromise: Promise<Stripe.Stripe | null> | null =
    null;

/**
 * Retrieves or creates a singleton Promise that resolves to a Stripe object.
 * The Stripe object allows you to interact with the Stripe.js library.
 *
 * @returns {Promise<Stripe.Stripe | null>} A promise that resolves to a Stripe object.
 */
export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
        );
    }
    return stripePromise;
};

/**
 * A custom React hook that provides access to the Stripe.js library.
 * It ensures that there is only a single instance of the Stripe object
 * throughout the application.
 *
 * @returns {Stripe.Stripe | null} The Stripe object to interact with the Stripe.js library or null if it's not yet loaded.
 */
export const useStripeClient = () => {
    const [stripe, setStripe] =
        useState<Stripe.Stripe | null>(null);

    useEffect(() => {
        // When the component mounts, load the Stripe library and set the state
        getStripe().then((stripe) => {
            setStripe(stripe);
        });
    }, []);

    return stripe;
};
