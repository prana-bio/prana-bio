'use client';

import { useEffect, useState } from 'react';
import {
    CaretSortIcon,
    CheckIcon,
} from '@radix-ui/react-icons';
import { cn } from '@/app/nucleus/utils';
import { Button } from '@/app/components/molecules/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '@/app/components/molecules/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/app/components/molecules/popover';
import { Country } from '@/app/types/Country';
import { useDashboardFilters } from '@/app/nucleus/context/dashboard-provider';
import { useFetch } from '@/app/nucleus/hooks/common/useFetch';
import { isoAlpha2ToFlagEmoji } from '@/app/nucleus/slice-and-dice';

export function CountrySelector(props: any) {
    const [open, setOpen] = useState(false);
    const {
        dashboardFilters,
        updateDashboardFilters,
        mapCountrySelected,
    } = useDashboardFilters();

    // Fetch countries data
    const {
        data: countries,
        isLoading: isCountriesLoading,
    } = useFetch(`/api/dashboard/countries`);

    // Effect to handle map country selection
    useEffect(() => {
        if (mapCountrySelected) {
            const countryFromMap = countries?.find(
                (country: Country) =>
                    country.iso_alpha3 ===
                    mapCountrySelected,
            );
            if (countryFromMap) {
                updateDashboardFilters({
                    ...dashboardFilters,
                    country: countryFromMap,
                });
            }
        }
    }, [mapCountrySelected, countries]);

    const handleSelectCountry = (country: Country) => {
        updateDashboardFilters({
            ...dashboardFilters,
            country,
        });
        setOpen(false); // Close the dropdown
    };

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
            {...props}
        >
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
                >
                    {dashboardFilters.country
                        ? dashboardFilters.country
                              .country_name
                        : 'Choose a Country'}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search Countries..." />
                    <CommandEmpty>
                        No countries found.
                    </CommandEmpty>
                    <CommandGroup
                        heading="Name"
                        className="max-h-80 overflow-y-auto"
                    >
                        {!isCountriesLoading &&
                            countries?.map(
                                (country: Country) => (
                                    <CommandItem
                                        key={
                                            country.country_id
                                        }
                                        onSelect={() =>
                                            handleSelectCountry(
                                                country,
                                            )
                                        }
                                    >
                                        <div
                                            className={cn(
                                                'flex items-center',
                                            )}
                                        >
                                            <span
                                                style={{
                                                    marginRight:
                                                        '8px',
                                                    paddingBottom:
                                                        '3px',
                                                }}
                                            >
                                                {isoAlpha2ToFlagEmoji(
                                                    country.iso_alpha2,
                                                )}
                                            </span>
                                            <span>
                                                {
                                                    country.country_name
                                                }
                                            </span>
                                            <CheckIcon
                                                className={cn(
                                                    'ml-auto h-4 w-4',
                                                    dashboardFilters
                                                        .country
                                                        ?.country_id ===
                                                        country.country_id
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                        </div>
                                    </CommandItem>
                                ),
                            )}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
