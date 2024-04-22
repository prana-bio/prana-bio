import { promises as fs } from 'fs';
import path from 'path';
import Image from 'next/image';
import { z } from 'zod';

import useSpecies from '@/app/nucleus/hooks/species/useSpecies';
import SpeciesList from '@/app/components/organisms/species-list';
import { useState } from 'react';

import { columns } from '@/app/components/molecules/columns';
import { DataTable } from '@/app/components/molecules/data-table';
// import { taxonSchema } from '@/app/nucleus/data/biodiversity-data/schema';
import { CountrySpecies } from '@/app/types/CountrySpecies';
import { useFetch } from '@/app/nucleus/hooks/common/useFetch';
import { useDashboardFilters } from '@/app/nucleus/context/dashboard-provider';
import { Icons } from '@/app/components/atoms/icons';

const BiodiversityData: React.FC = () => {
    const { dashboardFilters } = useDashboardFilters();
    const countryId = dashboardFilters.country?.country_id;

    // Fetch species data for the selected country
    const {
        data: speciesData,
        isLoading,
        isError,
    } = useFetch(
        `/api/dashboard/biodiversity-data?country_id=${countryId}`,
    );

    console.log(speciesData);
    return (
        <>
            <p className="hidden xl:block text-muted-foreground text-sm pb-2">
                Search and sort through species by country,
                IUCN status, and habitat area.
            </p>
            <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
                {isLoading ? (
                    <div className="shadow-md flex justify-center items-center">
                        <Icons.spinner className="animate-spin h-12 w-12 m-14 text-primary" />
                    </div>
                ) : (
                    <DataTable
                        //   data={taxons}
                        data={speciesData || []}
                        columns={columns}
                    />
                )}
            </div>
        </>
    );
};

export default BiodiversityData;
