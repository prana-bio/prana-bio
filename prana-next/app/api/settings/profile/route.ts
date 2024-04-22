/* Profile API Handler */
import { NextRequest, NextResponse } from 'next/server';

import type { User } from '@/app/types/User';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import { getAuthDataAndConfigureNile } from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles GET requests to fetch user data.
 * Only accessible to users with 'Admin' role.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {NextResponse} A NextResponse object with the user data or error message.
 */
export async function GET(
    req: NextRequest,
): Promise<NextResponse> {
    const isAuthorized = await enforceRoleBasedAccess([
        'Admin',
    ])(req);
    if (!isAuthorized) {
        return handleUnauthorizedResponse();
    }
    try {
        const { nile, userId } =
            getAuthDataAndConfigureNile(req);
        const userQuery = `
          SELECT *
          FROM users.users
          WHERE id = $1
          LIMIT 1;
      `;
        const result = await nile.db.query(userQuery, [
            userId,
        ]);
        const userData = result.rows[0];

        if (!userData) {
            return handleErrorResponse(
                new Error('User not found.'),
                'User not found.',
                404,
            );
        }
        return handleSuccessResponse(userData, 200);
    } catch (error: any) {
        return handleErrorResponse(
            error,
            'Get User Profile Error.',
            500,
        );
    }
}

/**
 * Handles PATCH requests to update user profile (public) data.
 * Only accessible to users with 'Admin' role.
 *
 * @param {NextRequest} req - The incoming Next.js request containing the update data.
 * @returns {NextResponse} A NextResponse object indicating success or error.
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
        const { nile, userId } =
            getAuthDataAndConfigureNile(req);
        const updateData: Partial<User> = await req.json();
        const updateQuery = `
          UPDATE users.users
          SET email = $1, bio = $2, picture = $3
          WHERE id = $4
          RETURNING *;
      `;
        const params = [
            updateData.email,
            updateData.bio,
            updateData.picture,
            userId,
        ];
        const result = await nile.db.query(
            updateQuery,
            params,
        );
        const updatedUser = result.rows[0];

        return handleSuccessResponse(
            {
                updatedUser,
                message: 'Successful User Profile Update.',
            },
            200,
        );
    } catch (error: any) {
        return handleErrorResponse(
            error,
            'Update User Profile Error.',
            500,
        );
    }
}
