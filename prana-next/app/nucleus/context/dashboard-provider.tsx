import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from 'react';
import { useUserSession } from '@/app/nucleus/context/user-provider';
import { useFetch } from '@/app/nucleus/hooks/common/useFetch';
import { DashboardFilters } from '@/app/types/DashboardFilters';

type GeoJSONData = GeoJSON.FeatureCollection | null;

interface DashboardContextType {
    dashboardFilters: DashboardFilters;
    updateDashboardFilters: (
        filters:
            | DashboardFilters
            | ((
                  prevFilters: DashboardFilters,
              ) => DashboardFilters),
    ) => void;
    resetDashboardFilters: () => void;
    geoJsonData: GeoJSONData;
    // possibly add propertySelected here instead and call it propertySelection so the state is separate
    updatePropertySelected: (property?: string) => void;
    mapCountrySelected: string | null; // Updated property name
    updateMapCountrySelected: (
        alphaCode: string | null,
    ) => void;
}

const DashboardContext =
    // assign initial states
    createContext<DashboardContextType>({
        dashboardFilters: { country: undefined },
        updateDashboardFilters: () => {},
        resetDashboardFilters: () => {},
        geoJsonData: null,
        updatePropertySelected: () => {},
        mapCountrySelected: null,
        updateMapCountrySelected: () => {},
    });

export const DashboardProvider: React.FC<
    DashboardProviderProps
> = ({ children }) => {
    const { userSession } = useUserSession();
    const default_country_id =
        userSession.selectedTenant?.default_country_id;

    // Fetch the default country data
    const {
        data: defaultCountryData,
        isLoading: isCountryLoading,
    } = useFetch(
        default_country_id
            ? `/api/dashboard/countries?country_id=${default_country_id}`
            : '',
    );

    // State for GeoJSON data
    const [geoJsonData, setGeoJsonData] =
        useState<GeoJSONData>(null);

    // Set initial dashboard filters state including the default country if available
    const [dashboardFilters, setDashboardFilters] =
        useState<DashboardFilters>({
            country: defaultCountryData ?? undefined,
            propertySelected: 'biodiversity_rank',
        });

    const [mapCountrySelected, setMapCountrySelected] =
        useState<string | null>(null);

    const updateMapCountrySelected = (
        alphaCode: string | null,
    ) => {
        setMapCountrySelected(alphaCode);
    };

    const updatePropertySelected = (property?: string) => {
        setDashboardFilters((prevFilters) => ({
            ...prevFilters,
            propertySelected:
                property ?? 'biodiversity_rank',
        }));
    };

    useEffect(() => {
        if (!isCountryLoading && defaultCountryData) {
            setDashboardFilters({
                country: defaultCountryData,
            });
        }
    }, [defaultCountryData, isCountryLoading]);

    // Fetch GeoJSON data
    useEffect(() => {
        const fetchGeoJsonData = async () => {
            try {
                const response = await fetch(
                    '/countries_biodiversity_rankings.geojson',
                );
                const data = await response.json();
                setGeoJsonData(data);
            } catch (error) {
                console.error(
                    'Failed to fetch GeoJSON data:',
                    error,
                );
            }
        };

        fetchGeoJsonData();
    }, []);

    const updateDashboardFilters = (
        dashboardFiltersUpdates:
            | DashboardFilters
            | ((
                  prevFilters: DashboardFilters,
              ) => DashboardFilters),
    ) => {
        setDashboardFilters((prevFilters) =>
            typeof dashboardFiltersUpdates === 'function'
                ? dashboardFiltersUpdates(prevFilters)
                : dashboardFiltersUpdates,
        );
    };

    const resetDashboardFilters = () => {
        setDashboardFilters({
            country: defaultCountryData,
            propertySelected: 'biodiversity_rank',
        });
        updateMapCountrySelected(null);
    };

    return (
        <DashboardContext.Provider
            value={{
                dashboardFilters,
                updateDashboardFilters,
                resetDashboardFilters,
                geoJsonData,
                updatePropertySelected,
                mapCountrySelected,
                updateMapCountrySelected,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardFilters =
    (): DashboardContextType => {
        const context = useContext(DashboardContext);

        if (!context) {
            throw new Error(
                'useDashboardFilters must be used within a DashboardProvider',
            );
        }
        return context;
    };

type DashboardProviderProps = {
    children: ReactNode;
};
