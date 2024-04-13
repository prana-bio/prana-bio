import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
    handleErrorResponse,
    handleSuccessResponse,
} from '@/app/nucleus/middleware/response-utils';

export async function POST(
    req: NextRequest,
): Promise<NextResponse> {
    try {
        // Clear 'authData' cookie by expiring it immediately
        cookies().set('authData', '', {
            path: '/',
            maxAge: -1,
        });
        return handleSuccessResponse(
            { message: 'Logged out.' },
            200,
        );
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Logout Error.',
            500,
        );
    }
}
