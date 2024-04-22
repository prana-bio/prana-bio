/* App.Dashboard.Filters */
'use client';
import React from 'react';

import { CountrySelector } from '@/app/components/molecules/country-selector';
import { Button } from '@/app/components/molecules/button';
import { ResetIcon } from '@radix-ui/react-icons';
import { useDashboardFilters } from '@/app/nucleus/context/dashboard-provider';


const DashboardFilters = () => {
    // Access the resetDashboardFilters function from the context
    const { resetDashboardFilters } = useDashboardFilters();

    // Handler for the reset button
    const handleReset = () => {
        resetDashboardFilters();
    };

    return (
        <>
            <div className="flex items-center space-x-2">
                <CountrySelector />
                <Button
                    variant={'ghost'}
                    onClick={handleReset}
                >
                    <ResetIcon />
                </Button>
            </div>
        </>
    );
};

export default DashboardFilters;
