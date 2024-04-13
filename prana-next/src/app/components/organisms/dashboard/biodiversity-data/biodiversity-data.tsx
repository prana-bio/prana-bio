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

// replace this with useFetch and get species for selected country
// use useDashboardFilters country to filter in fetch
const taxons = [
    {
        id: 'TAXON-8782',
        title: 'African Rhino',
        kingdom: 'animalia',
        label: 'favorite',
        status: 'endangered',
    },
    {
        id: 'TAXON-7878',
        title: 'Alaotra Reed Lemur',
        kingdom: 'animalia',
        label: 'favorite',
        status: 'critically-endangered',
    },
    {
        id: 'TAXON-7348',
        title: 'Great Hammerhead',
        kingdom: 'animalia',
        label: 'favorite',
        status: 'critically-endangered',
    },
    {
        id: 'TAXON-7278',
        title: 'Wandering Albatross',
        kingdom: 'animalia',
        label: 'favorite',
        status: 'vulnerable',
    },
];

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
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
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
