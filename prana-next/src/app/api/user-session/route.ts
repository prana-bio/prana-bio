/* User Session API Handler */
import { NextRequest, NextResponse } from 'next/server';

import type { User } from '@/app/types/User';
import { getAuthDataAndConfigureNileWithoutTenant } from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
} from '@/app/nucleus/middleware/response-utils';
import { Tenant } from '@/app/types/Tenant';
import { UserSession } from '@/app/types/UserSession';

/**
 * Handles GET requests to fetch user session data.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {NextResponse} A NextResponse object with the user session data or error message.
 */
export async function GET(
    req: NextRequest,
): Promise<NextResponse> {
    try {
        const { nile, userId } =
            getAuthDataAndConfigureNileWithoutTenant(req);

        // Fetch user data
        const userQuery =
            'SELECT * FROM users.users WHERE id = $1 LIMIT 1';
        const userResult = await nile.db.query(userQuery, [
            userId,
        ]);
        const userData: User | undefined =
            userResult.rows[0];

        if (!userData) {
            return handleErrorResponse(
                new Error('User not found.'),
                'User not found.',
                404,
            );
        }

        // Fetch tenant data and roles
        const tenantQuery = `
            SELECT tenants.*, tenant_users.roles
            FROM public.tenants
            LEFT JOIN users.tenant_users ON tenant_users.tenant_id = tenants.id
            WHERE tenant_users.user_id = $1
        `;
        const tenantsResult = await nile.db.query(
            tenantQuery,
            [userId],
        );
        const tenantsData: Tenant[] = tenantsResult.rows;

        // todo: replace this searchParams with checking auth cookie for default tenant id,
        // and add that variable to the cookie during login/signup

        // Determine selected tenant
        const selectedTenantId: string | null =
            req.nextUrl.searchParams.get(
                'selectedTenantId',
            ) || null;
        const selectedTenant: Tenant | null =
            tenantsData.find(
                (tenant) => tenant.id === selectedTenantId,
            ) ||
            tenantsData.find(
                (tenant) => tenant.default_tenant === true,
            ) ||
            tenantsData[0] ||
            null;

        const userSession: UserSession = {
            user: userData,
            selectedTenant: selectedTenant,
            tenants: tenantsData,
        };
        return handleSuccessResponse(userSession, 200);
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Get User Session Error.',
            500,
        );
    }
}
