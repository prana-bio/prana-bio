/* EPIs API Handler */
import { NextRequest, NextResponse } from 'next/server';

import { EPI } from '@/app/types/EPI';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import { getAuthDataAndConfigureNile } from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles GET requests to fetch epis for a given country name.
 * Only accessible to users with 'Member' or 'Admin' role.
 *
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {NextResponse} A NextResponse object with the user data or error message.
 */
export async function GET(
    req: NextRequest,
): Promise<NextResponse> {
    const isAuthorized = await enforceRoleBasedAccess([
        'Admin',
        'Member',
    ])(req);
    if (!isAuthorized) {
        return handleUnauthorizedResponse();
    }
    try {
        const { searchParams } = new URL(req.url);
        let country_id = searchParams.get('country_id');
        const { nile } = getAuthDataAndConfigureNile(req);

        // Construct the SQL query
        const epiQuery = `
          SELECT 
              countries_epis.country_epi_id,
              epis.name as name,
              epis.abbreviation as abbreviation,
              epis.description,
              countries_epis.score,
              countries_epis.rank,
              countries_epis.change,
              countries.name as country_name
          FROM countries_epis
          LEFT JOIN countries ON countries_epis.country_id = countries.country_id
          LEFT JOIN epis ON countries_epis.epi_id = epis.epi_id
          WHERE countries.country_id = $1
      `;
        const result = await nile.db.query(epiQuery, [
            country_id,
        ]);
        const episData: EPI[] = result.rows;

        if (!episData.length) {
            return handleErrorResponse(
                new Error('EPIs not found.'),
                'EPIs not found.',
                404,
            );
        }
        return handleSuccessResponse(episData, 200);
    } catch (error: any) {
        console.error('Get EPIs Error:', error.message);
        return handleErrorResponse(
            error,
            'Get EPIs Error.',
            500,
        );
    }
}
