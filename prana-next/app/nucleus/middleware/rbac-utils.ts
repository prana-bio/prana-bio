/**
 * Middleware: Role-Based Access Control (RBAC) for API Routes or Components
 *
 * - Implements Role-Based Access Control (RBAC) in a Next.js application.
 * - Ensures that only users with specific roles can access certain resources or routes.
 * - Focused on role verification, distinct from session validation.
 */

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

import { getUserRoles } from '@/app/nucleus/middleware/nile/auth-utils';
import AuthCookieData from '@/app/nucleus/middleware/nile/auth-utils';

const enforceRoleBasedAccess =
    (requiredRoles: string[]) =>
    async (req: NextRequest): Promise<boolean> => {
        try {
            const userRoles = getUserRolesFromRequest(req);

            const hasAccess =
                userRoles &&
                requiredRoles.some((role) =>
                    userRoles.includes(role),
                );

            if (!hasAccess) {
                throw new Error(
                    `Access Denied: User lacks required roles: ${requiredRoles.join(
                        ', ',
                    )}.`,
                );
            }

            return true;
        } catch (error: any) {
            console.error(
                'Error in enforceRoleBasedAccess:',
                error.message,
            );
            return false;
        }
    };
export default enforceRoleBasedAccess;

/**
 * Helper function to retrieve user roles from the request cookie.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {string[] | undefined} - An array of user roles or undefined if not found.
 */
function getUserRolesFromRequest(
    req: NextRequest,
): string[] | undefined {
    try {
        const cookieStore = cookies();
        const authData = cookieStore.get('authData') as
            | AuthCookieData
            | undefined;

        if (!authData) {
            throw new Error(
                'Authorization failed: authData not found in the cookie.',
            );
        }

        const userRoles = getUserRoles(authData);

        if (!userRoles) {
            throw new Error(
                'Authorization failed: Unable to retrieve user roles from authData.',
            );
        }

        return userRoles;
    } catch (error: any) {
        console.error(
            'Error in getUserRolesFromRequest:',
            error.message,
        );
        return undefined;
    }
}
