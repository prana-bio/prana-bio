/* Biodiversity Ranking API Handler */
import { NextRequest, NextResponse } from 'next/server';

import { CountrySpecies } from '@/app/types/CountrySpecies';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import { getAuthDataAndConfigureNile } from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles GET requests to fetch species data for a given country name.
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

        const speciesQuery = `
          SELECT 
              countries.country_id as "countryId",
              countries.iso_alpha3 as "isoAlpha3",
              countries.name as "countryName",
              countries_species.country_habitat_range_area as "countryHabitatRangeArea",
              countries_species.country_habitat_range_area_pct as "countryHabitatRangeAreaPct",
              iucn_categories.iucn_category_id as "IUCNCategoryId",
              iucn_categories.name as "IUCNCategoryName",
              iucn_categories.abbreviation as "IUCNCategoryAbbreviation",
              species.species_id as "speciesId",
              species.common_name as "speciesCommonName",
              species.binominal_name as "speciesBinomialName",
              species.species_group as "speciesGroup",
              species.total_habitat_range_area as "totalHabitatRangeArea",
              species.small_habitat_range_area as "smallHabitatRangeArea"
          FROM countries_species
          LEFT JOIN countries ON countries_species.country_id = countries.country_id
          LEFT JOIN species ON countries_species.species_id = species.species_id
          LEFT JOIN iucn_categories ON species.iucn_category_id = iucn_categories.iucn_category_id
          WHERE countries.country_id = $1
              AND species.binominal_name IS NOT NULL
              AND species.binominal_name != ''
              AND species.common_name IS NOT NULL
              AND species.common_name != ''
              AND species.binominal_name != 'NaN'
              AND species.common_name != 'NaN'
          ORDER BY 
              iucn_categories.abbreviation ASC,
              countries_species.country_habitat_range_area_pct DESC,
              species.common_name ASC
      `;
        const result = await nile.db.query(speciesQuery, [
            country_id,
        ]);
        const countrySpeciesData: CountrySpecies[] =
            result.rows;

        if (!countrySpeciesData.length) {
            return handleErrorResponse(
                new Error('Species data not found.'),
                'Species data not found.',
                404,
            );
        }
        return handleSuccessResponse(
            countrySpeciesData,
            200,
        );
    } catch (error: any) {
        console.error('Get Species Error:', error.message);
        return handleErrorResponse(
            error,
            'Get Species Error.',
            500,
        );
    }
}
