/* Countries API Handler */
import { NextRequest, NextResponse } from 'next/server';

import { Country } from '@/app/types/Country';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import { getAuthDataAndConfigureNile } from '@/app/nucleus/middleware/nile/auth-utils';
import {
    handleSuccessResponse,
    handleErrorResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

/**
 * Handles GET requests to fetch countries for the dashboard filters.
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

        if (country_id) {
            // Query for a specific country by ID
            const countryQuery = `
              SELECT country_id, name AS country_name, country_code, iso_alpha2, iso_alpha3, region, sub_region
              FROM public.countries
              WHERE country_id = $1
          `;
            const result = await nile.db.query(
                countryQuery,
                [country_id],
            );
            const country = result.rows[0];

            if (!country) {
                return handleErrorResponse(
                    new Error('Country not found.'),
                    'Country not found.',
                    404,
                );
            }
            return handleSuccessResponse(country, 200);
        } else {
            // Query for all countries with additional joins for data
            const countriesQuery = `
              SELECT DISTINCT countries.country_id, countries.name AS country_name, countries.country_code,
              countries.iso_alpha2, countries.iso_alpha3, countries.region, countries.sub_region
              FROM public.countries
              INNER JOIN public.countries_epis ON countries.country_id = countries_epis.country_id
              INNER JOIN public.countries_biodiversity_rankings ON countries.country_id = countries_biodiversity_rankings.country_id
              ORDER BY countries.name ASC
          `;
            const result = await nile.db.query(
                countriesQuery,
            );
            // const countries = result.rows;
            const countries: Country[] = result.rows.map(
                (row: Country) => ({
                    country_id: row.country_id,
                    country_name: row.country_name,
                    country_code: row.country_code,
                    iso_alpha2: row.iso_alpha2,
                    iso_alpha3: row.iso_alpha3,
                    region: row.region,
                    sub_region: row.sub_region,
                }),
            );

            if (!countries.length) {
                return handleErrorResponse(
                    new Error('Countries not found.'),
                    'Countries not found.',
                    404,
                );
            }
            return handleSuccessResponse(countries, 200);
        }
    } catch (error: any) {
        console.error(
            'Get Countries Error:',
            error.message,
        );
        return handleErrorResponse(
            error,
            'Get Countries Error.',
            500,
        );
    }
}
