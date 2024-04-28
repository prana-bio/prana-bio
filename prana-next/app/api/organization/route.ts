import { NextRequest, NextResponse } from 'next/server';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import {
    getAuthDataAndConfigureNile,
    getAuthDataAndConfigureNileWithoutTenant,
} from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles POST requests to create an organization.
 * Only accessible to users with 'Admin' role.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {NextResponse} A NextResponse object indicating success or error.
 */
export async function POST(
    req: NextRequest,
): Promise<NextResponse> {
    try {
        const { nile, userId } =
            getAuthDataAndConfigureNileWithoutTenant(req);

        const { organizationName } = await req.json(); // Correctly extracting organizationName from the request body

        await checkNameIsUnique(nile, organizationName);

        // Create an organizational tenant for the user
        await createOrganizationTenant(
            nile,
            userId,
            organizationName,
        );

        // Return success response
        return handleSuccessResponse(
            {
                message:
                    'Organization created successfully',
            },
            201,
        );
    } catch (error: any) {
        // Handle errors
        return handleErrorResponse(
            error,
            error.message
                ? error.message
                : 'Organization creation failed.',
            500,
        );
    }
}

/**
 * Checks if an organization with the specified name already exists.
 *
 * @param {any} nile - Nile instance.
 * @param {string} organizationName - Name of the organization to check.
 * @returns {Promise<boolean>} - Returns true if the organization exists, otherwise false.
 */
async function checkNameIsUnique(
    nile: any,
    organizationName: string,
): Promise<any> {
    const checkQuery = `
       SELECT EXISTS (
           SELECT 1 FROM tenants
           WHERE name = $1 AND type = 'Organization'
       );
   `;
    const result = await nile.db.query(checkQuery, [
        organizationName,
    ]);
    if (result.rows[0].exists) {
        throw new Error(`Name is already taken.`, {
            cause: 'Name is already taken.',
        });
    }
}

/**
 * Creates an organization (tenant) for a user.
 *
 * @param {any} nile - Nile instance.
 * @param {string} organizationName - Name of the organization.
 * @param {string} userId - ID of the user creating the organization.
 * @returns {Promise<string>} The ID of the newly created tenant.
 * @throws {Error} If an error occurs during tenant creation.
 */
async function createOrganizationTenant(
    nile: any,
    userId: string,
    organizationName: string,
): Promise<{ tenantId: string }> {
    const createTenantQuery = `
         INSERT INTO tenants (name, default_country_id, type)
         VALUES ($1, $2, 'Organization')
         RETURNING id;
      `;
    try {
        const tenantResult = await nile.db.query(
            createTenantQuery,
            [
                organizationName,
                'f43f9cf9-789b-42ad-ac83-d3170a44d2b0',
            ],
        );
        const assignRoleQuery = `
            INSERT INTO users.tenant_users (tenant_id, user_id, default_tenant, roles)
            VALUES ($1, $2, $3, ARRAY['Admin']::varchar[])
            RETURNING roles;
         `;
        await nile.db.query(assignRoleQuery, [
            tenantResult.rows[0].id,
            userId,
            false,
        ]);
        return {
            tenantId: tenantResult.rows[0].id as string,
        };
    } catch (error: any) {
        throw new Error(
            `Error processing organization (tenant) creation or role assignment.`,
            {
                cause: error,
            },
        );
    }
}
