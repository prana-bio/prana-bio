// Libraries
import jwtDecode from 'jwt-decode';
import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

import nile from '@/app/nucleus/middleware/nile/server';
import {
    DecodedJWTData,
    setAuthCookies,
} from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleErrorResponse,
    handleSuccessResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles user signup by creating and authenticating a user,
 * creating a personal tenant, assigning admin role, creating a stripe
 * customer, updating user and tenant info, setting cookies,
 * and returning a response.
 *
 * @param {Request} req - The request object.
 * @returns {Promise<Response>} A promise that resolves to a response object.
 */
export async function POST(
    req: Request,
): Promise<Response> {
    try {
        const { fullName, email, password } =
            await req.json();
        // create and authenticate user
        const res = await nile.api.auth.signUp({
            email,
            password,
        });
        if (res.ok) {
            const body = await res.json();
            const accessToken = body.token?.jwt;
            const decodedJWT =
                jwtDecode<DecodedJWTData>(accessToken);
            const userId = decodedJWT.sub;

            const nileU = nile.getInstance({
                tenantId: undefined,
                userId: userId,
                api: {
                    token: accessToken,
                },
            });

            await updateUserInfo(nileU, userId, fullName);

            const tenantId = await createPersonalTenant(
                nileU,
                decodedJWT,
            );

            const nileT = nile.getInstance({
                tenantId: tenantId,
                userId: userId,
                api: {
                    token: accessToken,
                },
            });

            const roles =
                await assignAdminRoleToPersonalTenant(
                    nileT,
                );

            const stripeCustomerId =
                await createStripeCustomer(
                    fullName,
                    email,
                    tenantId,
                );

            await updateTenantInfo(
                nileU,
                tenantId,
                stripeCustomerId,
            );

            setAuthCookies(
                accessToken,
                userId,
                tenantId,
                roles,
            );

            // success
            revalidatePath('/sign-up');
            return handleSuccessResponse(body, 201);
        } else {
            const body = await res.text();
            throw new Error('Signup Error.', {
                cause: body,
            });
        }
    } catch (error: Error | any) {
        return handleErrorResponse(error, error.cause, 500);
    }
}

/**
 * Creates a personal tenant for an authenticated user.
 *
 * @param {any} nileU - Authenticated Nile instance.
 * @param {DecodedJWTData} decodedJWT - Decoded JWT data.
 * @returns {Promise<string>} The ID of the created personal tenant.
 * @throws {Error} If an error occurs during tenant creation.
 */
async function createPersonalTenant(
    nileU: any,
    decodedJWT: DecodedJWTData,
): Promise<string> {
    const createTenantQuery = `
   INSERT INTO users.tenants (name, user_id)
   VALUES ($1, $2)
   RETURNING id;
`;
    try {
        const tenantName = `Personal - ${decodedJWT.sub}`;
        const result = await nileU.db.query(
            createTenantQuery,
            [tenantName, decodedJWT.sub],
        );
        return result.rows[0].id;
    } catch (error: any) {
        throw new Error('Create Personal Tenant Error.', {
            cause: error,
        });
    }
}

/**
 * Assigns admin role to a personal tenant.
 *
 * @param {any} nileT - Tenant-aware Nile instance.
 * @returns {Promise<string[]>} An array of assigned roles.
 * @throws {Error} If an error occurs during role assignment.
 */
async function assignAdminRoleToPersonalTenant(
    nileT: any,
): Promise<string[]> {
    const assignRoleQuery = `
   UPDATE users.tenant_users
   SET roles = ARRAY['Admin']::varchar[], default_tenant = true
   WHERE tenant_id = $1
   RETURNING roles;
`;
    try {
        const result = await nileT.db.query(
            assignRoleQuery,
            [nileT.tenantId],
        );
        return result.rows[0].roles;
    } catch (error: any) {
        throw new Error('Assign Admin Role Error.', {
            cause: error,
        });
    }
}

/**
 * Creates a new customer in Stripe with the provided details.
 *
 * This function takes the full name, email, and tenant ID of a user
 * and creates a corresponding customer in Stripe. The tenant ID is
 * stored as metadata on the Stripe customer object for future reference.
 *
 * @param {string} fullName - The full name of the user.
 * @param {string} email - The email address of the user.
 * @param {string} tenantId - The tenant ID associated with the user.
 * @returns {Promise<string>} The ID of the newly created Stripe customer.
 * @throws Will throw an error if customer creation fails.
 */
async function createStripeCustomer(
    fullName: string,
    email: string,
    tenantId: string,
) {
    try {
        // initialize Stripe with the secret key
        const stripe = new Stripe(
            process.env.STRIPE_SECRET_KEY || '',
            {
                apiVersion: '2023-10-16',
            },
        );
        const customer = await stripe.customers.create({
            name: fullName,
            email: email,
            metadata: { tenantId: tenantId },
        });
        return customer.id;
    } catch (error: Error | any) {
        throw new Error('Create Stripe Customer Error.', {
            cause: error,
        });
    }
}

/**
 * Updates additional user info.
 *
 * @param {any} nileU - User-aware Nile instance.
 * @param {string} userId - UserId to update.
 * @param {string} fullName - Full name to save in user table.
 * @throws {Error} If an error occurs while updating user info.
 */
async function updateUserInfo(
    nileU: any,
    userId: string | undefined,
    fullName: string,
) {
    const updateQuery = `
   UPDATE users.users
   SET full_name = $1
   WHERE id = $2;
`;
    try {
        await nileU.db.query(updateQuery, [
            fullName,
            userId,
        ]);
    } catch (error: any) {
        throw new Error('Update User Info Error.', {
            cause: error,
        });
    }
}

/**
 * Updates additional tenant info.
 *
 * @param {any} nileT - Tenant-aware Nile instance.
 * @param {string} userId - User identifier to update.
 * @param {string} stripeCustomerId - Stripe Customer identifier to save.
 * @throws {Error} If an error occurs while updating user info.
 */
async function updateTenantInfo(
    nileT: any,
    tenantId: string | undefined,
    stripeCustomerId: string,
) {
    const updateTenantQuery = `
   UPDATE users.tenants
   SET stripe_customer_id = $1
   WHERE id = $2;
`;
    try {
        await nileT.db.query(updateTenantQuery, [
            stripeCustomerId,
            tenantId,
        ]);
    } catch (error: Error | any) {
        throw new Error('Update Tenant Info Error.', {
            cause: error,
        });
    }
}
