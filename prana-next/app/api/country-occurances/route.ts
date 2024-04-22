/* CountryOccurances API Handler */
import { NextRequest, NextResponse } from 'next/server';
import type { CountryOccurances } from '@/app/types/CountryOccurances';
import {
    handleErrorResponse,
    handleSuccessResponse,
} from '@/app/nucleus/middleware/response-utils';

export async function GET(
    req: NextRequest,
): Promise<NextResponse> {
    try {
        const APIURL = `https://api.gbif.org/v1/occurrence/counts/countries`;
        const GBIFResponse = (await fetch(APIURL)) as any;
        if (GBIFResponse.ok) {
            const data =
                (await GBIFResponse.json()) as CountryOccurances;
            return handleSuccessResponse(data, 200);
        } else {
            const body = await GBIFResponse.json();
            throw new Error('Fetch GBIF Data Error.', {
                cause: body,
            });
        }
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Get Country Occurances Error.',
            500,
        );
    }
}
