/* Account API Handler */
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
 * Handles GET requests to fetch users account data.
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
          SELECT id, full_name, birthday, language
          FROM users.users
          WHERE id = $1
          LIMIT 1;
      `;
        const result = await nile.db.query(userQuery, [
            userId,
        ]);
        const accountData = result.rows[0];

        if (!accountData) {
            return handleErrorResponse(
                new Error('User not found.'),
                'User not found.',
                404,
            );
        }
        return handleSuccessResponse(accountData, 200);
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Get Account Error.',
            500,
        );
    }
}

/**
 * Handles PATCH requests to update user account (private) data.
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
          SET full_name = $1, birthday = $2, language = $3
          WHERE id = $4
          RETURNING *;
      `;
        const params = [
            updateData.full_name,
            updateData.birthday,
            updateData.language,
            userId,
        ];
        const result = await nile.db.query(
            updateQuery,
            params,
        );
        const updatedUser = result.rows[0];

        return handleSuccessResponse(
            {
                updatedUser: updatedUser,
                message: 'Successful User Account Update.',
            },
            200,
        );
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Update User Account Info Error.',
            500,
        );
    }
}

/**
 * Handles DELETE requests for soft deletion of a user.
 * Only accessible to users with 'Admin' role.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {NextResponse} A NextResponse object indicating success or error.
 */
export async function DELETE(
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
        const deleteQuery = `
          UPDATE users.users
          SET deleted = NOW()
          WHERE id = $1;
      `;
        await nile.db.query(deleteQuery, [userId]);
        return handleSuccessResponse(
            {
                message: 'Successful User Soft Delete.',
            },
            200,
        );
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Soft Delete User Error.',
            500,
        );
    }
}
