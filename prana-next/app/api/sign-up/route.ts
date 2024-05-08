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

            const { tenantId, roles } =
                await createPersonalTenant(
                    nileU,
                    decodedJWT,
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
 * Creates a personal tenant for an authenticated user, and assign admin role.
 *
 * @param {any} nileU - Authenticated Nile instance.
 * @param {DecodedJWTData} decodedJWT - Decoded JWT data.
 * @returns {Promise<string>} The ID of the created personal tenant.
 * @throws {Error} If an error occurs during tenant creation.
 */
async function createPersonalTenant(
    nileU: any,
    decodedJWT: DecodedJWTData,
): Promise<{ tenantId: string; roles: string[] }> {
    const createTenantQuery = `
      INSERT INTO tenants (name, default_country_id)
      VALUES ($1, $2)
      RETURNING id;
   `;
    try {
        const tenantName = `Personal - ${decodedJWT.sub}`;
        const tenantResult = await nileU.db.query(
            createTenantQuery,
            [
                tenantName,
                'f43f9cf9-789b-42ad-ac83-d3170a44d2b0',
            ],
        );
        const assignRoleQuery = `
            INSERT INTO users.tenant_users (tenant_id, user_id, default_tenant, roles)
            VALUES ($1, $2, $3, ARRAY['Admin']::varchar[])
            RETURNING roles;
         `;
        const roleResult = await nileU.db.query(
            assignRoleQuery,
            [tenantResult.rows[0].id, nileU.userId, true],
        );
        return {
            tenantId: tenantResult.rows[0].id as string,
            roles: roleResult.rows[0].roles as string[],
        };
    } catch (error: any) {
        throw new Error(
            `Error processing tenant creation or role assignment.`,
            {
                cause: error,
            },
        );
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
 * @param {any} nileU - User-aware Nile instance.
 * @param {string} userId - User identifier to update.
 * @param {string} stripeCustomerId - Stripe Customer identifier to save.
 * @throws {Error} If an error occurs while updating user info.
 */
async function updateTenantInfo(
    nileU: any,
    tenantId: string | undefined,
    stripeCustomerId: string,
) {
    const updateTenantQuery = `
      UPDATE tenants
      SET stripe_customer_id = $1
      WHERE id = $2;
   `;
    try {
        await nileU.db.query(updateTenantQuery, [
            stripeCustomerId,
            tenantId,
        ]);
    } catch (error: Error | any) {
        throw new Error('Update Tenant Info Error.', {
            cause: error,
        });
    }
}
