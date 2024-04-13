/* Profile Picture API Handler */
import { put } from '@vercel/blob';
import { NextResponse, NextRequest } from 'next/server';

import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import {
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles the POST request for updating a profile picture.
 *
 * This API endpoint is designed to handle the uploading of profile pictures. It makes use of
 * role-based access control (RBAC) to ensure that only users with 'Admin' role are authorized
 * to perform this operation. The function retrieves the filename from the request URL's search
 * parameters and the image data from the request body. It then uses the '@vercel/blob' module
 * to store the image as a public blob. If the operation is successful, it returns the blob
 * information in JSON format. In case of unauthorized access or any other error, appropriate
 * error responses are returned.
 *
 * @param {NextRequest} req - The incoming request object from Next.js, containing URL,
 * search parameters, and body.
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response object.
 * It can either contain the blob information in case of success or an error/unauthorized response.
 */
export async function POST(
    req: NextRequest,
): Promise<NextResponse> {
    const isAuthorized = await enforceRoleBasedAccess([
        'Admin',
    ])(req);
    if (!isAuthorized) {
        return handleUnauthorizedResponse();
    }
    try {
        const { searchParams } = new URL(req.url);
        const filename =
            'profile-pictures/' +
            searchParams.get('filename');
        const blob = await put(
            filename as string,
            req.body as ReadableStream,
            {
                access: 'public',
                token: process.env.BLOB_READ_WRITE_TOKEN,
            },
        );
        return NextResponse.json(blob);
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Update Profile Picture Error.',
            500,
        );
    }
}
