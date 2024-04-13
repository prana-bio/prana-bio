import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import {
    handleErrorResponse,
    handleSuccessResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';
import { Tenant } from '@/app/types/Tenant';
import { getAuthDataAndConfigureNile } from '@/app/nucleus/middleware/nile/auth-utils';

/**
 * PATCH endpoint to associate a payment method with a tenant.
 * Access to this endpoint is restricted to users with 'Admin' role.
 *
 * @param {NextRequest} req - The incoming request object from Next.js
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response object.
 */
export async function PATCH(
    req: NextRequest,
): Promise<NextResponse> {
    const isAuthorized = await enforceRoleBasedAccess([
        'Admin',
    ])(req);
    if (!isAuthorized) {
        return handleUnauthorizedResponse();
    }
    try {
        const { paymentMethodId } = await req.json();
        const { nile } = getAuthDataAndConfigureNile(req);

        const tenant: Partial<Tenant> =
            await attachToPersonalTenant(
                nile,
                paymentMethodId,
            );
        await attachToStripeCustomer(
            tenant,
            paymentMethodId,
        );

        return handleSuccessResponse({ tenant: tenant });
    } catch (error: Error | any) {
        return handleErrorResponse(error, error.cause, 500);
    }
}

/**
 * Attach Stripe Card Payment ID to Personal Tenant in Nile.
 *
 * @param {any} nile - Nile instance.
 * @param {any} stripeCardPaymentMethodId - Stripe Payment Method ID.
 * @returns {Promise<Tenant>} Tenant Object.
 * @throws {Error} If an error occurs during role assignment.
 */
async function attachToPersonalTenant(
    nile: any,
    stripeCardPaymentMethodId: string,
): Promise<Partial<Tenant>> {
    try {
        const result = await nile.db.query(
            `
          UPDATE users.tenants
          SET stripe_card_payment_method_id = $1
          WHERE id = $2
          RETURNING *;
      `,
            [stripeCardPaymentMethodId, nile.tenantId],
        );

        return result.rows[0];
    } catch (error: any) {
        console.error(
            'Failed to update tenant with payment method ID:',
            error,
        );
        throw new Error(
            'Update Stripe Card Payment Method Error.',
            { cause: error },
        );
    }
}

/**
 * Attach Payment Method to Stripe Customer within Stripe.
 *
 *
 * @param {string} stripe_card_payment_method_id
 * @param {Tenant} tenant
 * @throws an error if API request to Stripe fails.
 */
async function attachToStripeCustomer(
    tenant: Partial<Tenant>,
    stripe_card_payment_method_id: string,
) {
    try {
        const stripe = new Stripe(
            process.env.STRIPE_SECRET_KEY || '',
            {
                apiVersion: '2023-10-16',
            },
        );
        await stripe.paymentMethods.attach(
            stripe_card_payment_method_id,
            {
                customer: tenant.stripe_customer_id || '',
            },
        );
    } catch (error: Error | any) {
        throw new Error(
            'Attach Payment Method to Stripe Customer Error.',
            {
                cause: error,
            },
        );
    }
}
