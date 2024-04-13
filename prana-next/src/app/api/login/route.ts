// Libraries
import { NextRequest, NextResponse } from 'next/server';
import jwtDecode from 'jwt-decode';
import { revalidatePath } from 'next/cache';
import nile from '@/app/nucleus/middleware/nile/server';

// Custom Modules - Auth Utils
import {
    DecodedJWTData,
    setAuthCookies,
} from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleErrorResponse,
    handleSuccessResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles user login by finding and authenticating a user, retrieving personal
 * tenant information, setting cookies, and returning a response.
 *
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to a response object.
 */
export async function POST(req: NextRequest) {
    try {
        //  find and authenticate user
        const res = await nile.api.auth.login(req);

        if (res.ok) {
            const body = await res.json();
            const accessToken = body.token.jwt;
            const decodedJWT =
                jwtDecode<DecodedJWTData>(accessToken);

            // initialize authenticated nile instance
            const nileU = nile.getInstance({
                tenantId: undefined,
                userId: decodedJWT.sub,
                api: {
                    token: accessToken,
                },
            });
            // find personal tenant
            const { userId, tenantId, roles } =
                await findPersonalTenant(nileU);
            // set cookies
            setAuthCookies(
                accessToken,
                userId,
                tenantId,
                roles,
            );
            // success
            revalidatePath('/');
            return handleSuccessResponse(body, 200);
        } else {
            const body = await res.text();
            throw new Error('Login Error.', {
                cause: body,
            });
        }
    } catch (error: Error | any) {
        return handleErrorResponse(error, error.cause, 500);
    }
}

/**
 * Finds the personal tenant for an authenticated user, along with their roles.
 *
 * @param {any} nileU - Authenticated Nile instance.
 * @returns {Promise<UserTenantRoles>} A promise that resolves to an object containing user, tenant, and roles information.
 * @throws {Error} If an error occurs while attempting to find the personal tenant.
 */
async function findPersonalTenant(
    nileU: any,
): Promise<UserTenantRoles> {
    try {
        console.log(
            'Attempting to find personal tenant',
            nileU,
        );

        // Construct SQL query to join tenant_users and tenants tables
        const sqlQuery = `
          SELECT tenant_users.user_id, tenant_users.tenant_id, tenant_users.roles
          FROM users.tenant_users
          LEFT JOIN public.tenants ON tenants.id = tenant_users.tenant_id
          WHERE tenants.type = 'Personal' AND tenant_users.user_id = $1
      `;

        // Execute query with parameter for user_id
        const personalTenantDBResponse =
            await nileU.db.query(sqlQuery, [nileU.userId]);

        // Accessing the first result from the rows array
        const [firstResult] = personalTenantDBResponse.rows;

        if (!firstResult) {
            throw new Error(
                'No personal tenant found for the user.',
            );
        }

        const userTenantRoles: UserTenantRoles = {
            userId: firstResult.user_id,
            tenantId: firstResult.tenant_id,
            roles: firstResult.roles,
        };
        return userTenantRoles;
    } catch (error: Error | any) {
        throw new Error('Find Personal Tenant Error.', {
            cause: error,
        });
    }
}

export interface UserTenantRoles {
    userId: string;
    tenantId: string;
    roles: string[];
}
