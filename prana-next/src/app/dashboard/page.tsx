'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

// Import your components and hooks
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/molecules/card';
import { ContributionHistory } from '@/app/components/organisms/dashboard/birds-eye-view/contribution-history';
import EPICard from '@/app/components/organisms/dashboard/birds-eye-view/epi-card';
import { EPI } from '@/app/types/EPI';
import { useFetch } from '@/app/nucleus/hooks/common/useFetch';
import { useDashboardFilters } from '@/app/nucleus/context/dashboard-provider';
import { placeholderEPIs } from '../nucleus/data/epis';
import BiodiversityRankingChart from '../components/organisms/dashboard/birds-eye-view/biodiversity-ranking-chart';
import { Icons } from '../components/atoms/icons';
import BiodiversityMap from '../components/organisms/dashboard/biodiversity-map/biodiversity-map';

const Dashboard: React.FC = () => {
    const { theme } = useTheme();

    const { dashboardFilters, updatePropertySelected } =
        useDashboardFilters();
    const country_id =
        dashboardFilters?.country?.country_id;

    const [selectedEPICardIndex, setSelectedEPICardIndex] =
        useState<number | null>(null);

    const {
        data: EPIs,
        isLoading: EPIsLoading,
        isError: EPIsError,
    } = useFetch(
        dashboardFilters.country
            ? `/api/dashboard/epis?country_id=${country_id}`
            : '',
    );

    const {
        data: biodiversityRanking,
        isLoading: biodiversityRankingLoading,
        isError: biodiversityRankingError,
    } = useFetch(
        dashboardFilters.country
            ? `/api/dashboard/biodiversity-ranking?country_id=${country_id}`
            : '',
    );

    // Determine the data to be displayed: placeholder data if loading, fetched data otherwise
    const EPIDisplayData = EPIsLoading
        ? placeholderEPIs
        : EPIs;

    const biodiversityRankingDisplayData =
        biodiversityRankingLoading
            ? ''
            : biodiversityRanking;

    const isBiodiversityRankSelected =
        dashboardFilters.propertySelected ===
        'biodiversity_rank';

    // Set 'biodiversity_rank' as the selected property by default on component mount
    useEffect(() => {
        if (!dashboardFilters.propertySelected) {
            updatePropertySelected('biodiversity_rank');
        }
    }, [
        dashboardFilters.propertySelected,
        updatePropertySelected,
    ]);

    // Set the selected EPI card based on the dashboard context when component mounts
    useEffect(() => {
        if (dashboardFilters.propertySelected && EPIs) {
            const selectedIndex = EPIs.findIndex(
                (EPI: EPI) =>
                    EPI.abbreviation ===
                    dashboardFilters.propertySelected,
            );
            setSelectedEPICardIndex(
                selectedIndex >= 0 ? selectedIndex : null,
            );
        }
    }, [dashboardFilters.propertySelected, EPIs]);

    return (
        <>
            <p className="hidden xl:block text-muted-foreground text-sm">
                Track our progress towards biodiversity
                conservation around the world.
            </p>
            <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-6">
                {EPIDisplayData &&
                    EPIDisplayData.map(
                        (EPI: EPI, index: number) => (
                            <EPICard
                                key={index}
                                onClick={() => {
                                    setSelectedEPICardIndex(
                                        index,
                                    );
                                    updatePropertySelected(
                                        EPI.abbreviation,
                                    );
                                }}
                                isSelected={
                                    selectedEPICardIndex ===
                                    index
                                }
                                name={EPI.name}
                                description={
                                    EPI.description
                                }
                                abbreviation={
                                    EPI.abbreviation
                                }
                                score={EPI.score}
                                rank={EPI.rank}
                                change={EPI.change}
                                loading={EPIsLoading}
                                error={EPIsError}
                            />
                        ),
                    )}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 pt-2">
                <Card
                    className={`sm:col-span-7 md:col-span-4 lg:col-span-3 shadow-md cursor-pointer ${
                        isBiodiversityRankSelected
                            ? theme == 'dark'
                                ? 'border-2 border-gray-100'
                                : 'border-2 border-gray-400'
                            : 'hover:border-gray-200'
                    }`}
                    onClick={() => {
                        updatePropertySelected(
                            'biodiversity_rank',
                        );
                        setSelectedEPICardIndex(null);
                    }}
                >
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>
                            Biodiversity Rank
                        </CardTitle>
                        <span className="text-xs text-gray-400">
                            {!biodiversityRankingLoading && (
                                <span
                                    className={`font-semibold text-lg ${
                                        biodiversityRankingDisplayData[0]
                                            .biodiversity_rank <=
                                        75
                                            ? 'text-primary'
                                            : biodiversityRankingDisplayData[0]
                                                  .biodiversity_rank <=
                                              150
                                            ? 'text-warning'
                                            : 'text-destructive'
                                    }`}
                                >
                                    #
                                    {`${biodiversityRankingDisplayData[0].biodiversity_rank}`}
                                </span>
                            )}
                        </span>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {biodiversityRankingLoading ? (
                            <div className="shadow-md flex justify-center items-center">
                                <Icons.spinner className="animate-spin h-8 w-8 m-14 text-primary" />
                            </div>
                        ) : (
                            <BiodiversityRankingChart
                                biodiversityRanking={
                                    biodiversityRankingDisplayData[0]
                                }
                                loading={
                                    biodiversityRankingLoading
                                }
                                error={
                                    biodiversityRankingError
                                }
                                onClick={
                                    updatePropertySelected
                                }
                            />
                        )}
                    </CardContent>
                </Card>
                <Card className="sm:col-span-7 md:col-span-3 lg:col-span-3 shadow-md">
                    <CardHeader>
                        <CardTitle>
                            {/* Biodiversity Map
                            {
                                dashboardFilters?.country
                                    ?.country_name
                            }{' '} */}
                            Biodiversity Map
                        </CardTitle>
                        {/* <CardDescription>
                            Explore the surrounding areas.
                        </CardDescription> */}
                    </CardHeader>
                    <CardContent>
                        {/* <ContributionHistory /> */}
                        <BiodiversityMap />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default Dashboard;
