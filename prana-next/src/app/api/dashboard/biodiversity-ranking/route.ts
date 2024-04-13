/* Biodiversity Ranking API Handler */
import { NextRequest, NextResponse } from 'next/server';

import { BiodiversityRanking } from '@/app/types/BiodiversityRanking';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import { getAuthDataAndConfigureNile } from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles GET requests to fetch biodiversity ranks for a given country name.
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

        const rankingQuery = `
          SELECT 
              cbr.country_biodiversity_rank_id,
              c.name as country_name,
              cbr.biodiversity_rank,
              cbr.amphibians,
              cbr.amphibians_rank,
              cbr.birds,
              cbr.birds_rank,
              cbr.fish,
              cbr.fish_rank,
              cbr.mammals,
              cbr.mammals_rank,
              cbr.reptiles,
              cbr.reptiles_rank,
              cbr.plants,
              cbr.plants_rank
          FROM countries_biodiversity_rankings cbr
          LEFT JOIN countries c ON cbr.country_id = c.country_id
          WHERE c.country_id = $1
      `;
        const result = await nile.db.query(rankingQuery, [
            country_id,
        ]);
        const biodiversityRankingData: BiodiversityRanking[] =
            result.rows;

        if (!biodiversityRankingData.length) {
            return handleErrorResponse(
                new Error(
                    'Biodiversity ranking not found.',
                ),
                'Biodiversity ranking not found.',
                404,
            );
        }
        return handleSuccessResponse(
            biodiversityRankingData,
            200,
        );
    } catch (error: any) {
        console.error(
            'Get Biodiversity ranking Error:',
            error.message,
        );
        return handleErrorResponse(
            error,
            'Get Biodiversity ranking Error.',
            500,
        );
    }
}
