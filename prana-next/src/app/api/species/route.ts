/* Species API Handler */
import { NextRequest, NextResponse } from 'next/server';
import type { Species } from '@/app/types/deprecated/Species';
import enforceRoleBasedAccess from '@/app/nucleus/middleware/rbac-utils';
import {
    handleErrorResponse,
    handleSuccessResponse,
    handleUnauthorizedResponse,
} from '@/app/nucleus/middleware/response-utils';

interface GBIFResponseJSON {
    offset?: number;
    limit?: number;
    endOfRecords: boolean;
    results: Species[];
}

export async function GET(
    req: NextRequest,
    res: NextResponse,
) {
    const isAuthorized = await enforceRoleBasedAccess([
        'Admin',
        'Member',
    ])(req);

    if (!isAuthorized) {
        return handleUnauthorizedResponse();
    }
    try {
        const { searchParams } = new URL(req.url);
        const offset = searchParams.get('offset');

        if (!isValidOffset(offset)) {
            return handleErrorResponse(
                new Error('Offset is Not Valid.'),
                'Offset is Not Valid.',
                400,
            );
        }

        try {
            const APIURL = `https://api.gbif.org/v1/species/?offset=${offset}`;
            const GBIFResponse = (await fetch(
                APIURL,
            )) as any;
            if (GBIFResponse.ok) {
                const data =
                    (await GBIFResponse.json()) as GBIFResponseJSON;
                const speciesList: Species[] =
                    data.results.map((result: any) => ({
                        speciesKey: result.key,
                        nubKey: result.nubKey,
                        nameKey: result.nameKey,
                        taxonID: result.taxonID,
                        sourceTaxonKey:
                            result.sourceTaxonKey,
                        kingdom: result.kingdom,
                        kingdomKey: result.kingdomKey,
                        datasetKey: result.datasetKey,
                        constituentKey:
                            result.constituentKey,
                        scientificName:
                            result.scientificName,
                        canonicalName: result.canonicalName,
                        vernacularName:
                            result.vernacularName,
                        nameType: result.nameType,
                        rank: result.rank,
                        origin: result.origin,
                        taxonomicStatus:
                            result.taxonomicStatus,
                        nomenclaturalStatus:
                            result.nomenclaturalStatus,
                        remarks: result.remarks,
                        numDescendants:
                            result.numDescendants,
                        lastCrawled: result.lastCrawled,
                        lastInterpreted:
                            result.lastInterpreted,
                        issues: result.issues,
                    }));
                return handleSuccessResponse(
                    speciesList,
                    200,
                );
            } else {
                const error = await GBIFResponse.json();
                throw new Error(
                    'GBIF API Response Not OK.',
                    {
                        cause: error,
                    },
                );
            }
        } catch (error: Error | any) {
            throw new Error('GBIF API Fetch Error.', {
                cause: error,
            });
        }
    } catch (error: Error | any) {
        return handleErrorResponse(
            error,
            'Get Species Data Error.',
            500,
        );
    }

    function isValidOffset(offset: string | null): boolean {
        if (offset === null) {
            return false;
        }
        const offsetNumber = Number(offset);
        return !isNaN(offsetNumber) && offsetNumber >= 0;
    }
}
