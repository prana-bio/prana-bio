import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import mapboxgl from 'mapbox-gl';
import { useDashboardFilters } from '@/app/nucleus/context/dashboard-provider';

mapboxgl.accessToken =
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const Mapbox: React.FC = () => {
    const { theme } = useTheme();

    const mapContainerRef = useRef<HTMLDivElement | null>(
        null,
    );
    const {
        geoJsonData,
        dashboardFilters,
        mapCountrySelected,
        updateMapCountrySelected,
    } = useDashboardFilters();

    const [map, setMap] = useState<mapboxgl.Map | null>(
        null,
    );
    const [mapLoaded, setMapLoaded] = useState(false);

    // Initialize or update map
    useEffect(() => {
        if (
            mapContainerRef.current === null ||
            !geoJsonData
        )
            return;

        const initializeMap = () => {
            const newMap = new mapboxgl.Map({
                container: mapContainerRef.current!,
                //  style: `mapbox://styles/mapbox/outdoors-v12`,
                style: `mapbox://styles/mapbox/${
                    theme === 'dark'
                        ? 'dark-v11'
                        : 'light-v11'
                }`,
                center: [0, 0],
                zoom: 0,
            });

            newMap.on('load', () => {
                setMapLoaded(true);
                newMap.addSource('countries', {
                    type: 'geojson',
                    data: geoJsonData,
                });

                newMap.addLayer({
                    id: 'countries-fill-layer',
                    type: 'fill',
                    source: 'countries',
                    paint: {
                        'fill-color': [
                            'case',
                            [
                                '<=',
                                [
                                    'get',
                                    'biodiversity_rank',
                                ],
                                75,
                            ],
                            '#1f591e',
                            [
                                '<=',
                                [
                                    'get',
                                    'biodiversity_rank',
                                ],
                                150,
                            ],
                            '#ffc658',
                            '#ff6347',
                        ],
                        'fill-opacity': 0.7,
                    },
                });

                newMap.addLayer({
                    id: 'countries-line-layer',
                    type: 'line',
                    source: 'countries',
                    layout: {
                        'line-cap': 'round',
                        'line-join': 'round',
                    },
                    paint: {
                        'line-color': '#f3f4f6',
                        'line-width': 0,
                        'line-dasharray': [1, 2],
                    },
                });

                setMap(newMap);
            });

            return newMap;
        };

        if (!map) {
            const newMap = initializeMap();
            return () => newMap.remove();
        } else {
            setMapLoaded(false);
            map.on('style.load', () => {
                setMapLoaded(true);
            });
            map.setStyle(
                `mapbox://styles/mapbox/outdoors-v12`,
            );
        }
    }, [geoJsonData]);

    // Update selected country when changes
    useEffect(() => {
        if (
            map &&
            mapLoaded &&
            dashboardFilters.country?.iso_alpha3 &&
            geoJsonData
        ) {
            const isoAlpha3 =
                dashboardFilters.country.iso_alpha3;

            // Highlight the selected country
            map.setPaintProperty(
                'countries-line-layer',
                'line-width',
                [
                    'case',
                    ['==', ['get', 'ISO_A3'], isoAlpha3],
                    2,
                    0,
                ],
            );

            // Fit the map bounds to the selected country
            const selectedFeature =
                geoJsonData.features.find(
                    (feature) =>
                        feature.properties?.ISO_A3 ===
                        isoAlpha3,
                );

            if (selectedFeature) {
                const bounds = new mapboxgl.LngLatBounds();
                const geometry = selectedFeature.geometry;

                if (geometry.type === 'Polygon') {
                    geometry.coordinates[0].forEach(
                        (coord) =>
                            bounds.extend(
                                coord as mapboxgl.LngLatLike,
                            ),
                    );
                } else if (
                    geometry.type === 'MultiPolygon'
                ) {
                    geometry.coordinates.forEach(
                        (polygon) =>
                            polygon[0].forEach((coord) =>
                                bounds.extend(
                                    coord as mapboxgl.LngLatLike,
                                ),
                            ),
                    );
                }

                map.fitBounds(bounds, {
                    //   padding: 20,
                });
            }
        }
    }, [dashboardFilters.country, mapLoaded, geoJsonData]);

    useEffect(() => {
        if (
            map &&
            mapLoaded &&
            dashboardFilters.propertySelected
        ) {
            // Generate the color expression based on the selected property
            const colorExpression = generateColorExpression(
                dashboardFilters.propertySelected,
            );

            // Update the map's fill color for the countries-fill-layer
            map.setPaintProperty(
                'countries-fill-layer',
                'fill-color',
                colorExpression,
            );
        }
    }, [dashboardFilters.propertySelected, map, mapLoaded]);

    useEffect(() => {
        if (!map || !mapLoaded || !geoJsonData) return;

        const selectCountry = (
            e: mapboxgl.MapMouseEvent & mapboxgl.EventData,
        ) => {
            if (!e.features || e.features.length === 0)
                return;
            const clickedFeature = e.features[0];
            const isoAlpha3 =
                clickedFeature.properties?.ISO_A3;

            console.log(isoAlpha3);
            updateMapCountrySelected(isoAlpha3);
        };

        map.on(
            'click',
            'countries-fill-layer',
            selectCountry,
        );

        return () => {
            if (map) {
                map.off(
                    'click',
                    'countries-fill-layer',
                    selectCountry,
                );
            }
        };
    }, [
        map,
        mapLoaded,
        geoJsonData,
        updateMapCountrySelected,
    ]);

    useEffect(() => {
        if (map && mapLoaded && mapCountrySelected) {
            // Highlight the selected country by setting a gray outline
            map.setPaintProperty(
                'countries-line-layer',
                'line-color',
                '#f3f4f6',
            ); // Set default line color
            map.setPaintProperty(
                'countries-line-layer',
                'line-width',
                [
                    'case',
                    [
                        '==',
                        ['get', 'ISO_A3'],
                        mapCountrySelected,
                    ],
                    2,
                    0,
                ],
            );
        }
    }, [map, mapLoaded, mapCountrySelected]);

    return (
        <div
            ref={mapContainerRef}
            className="map-container"
            style={{
                width: '100%',
                height: '400px',
            }}
        />
    );
};

export default Mapbox;

const generateColorExpression = (property: string) => {
    // Check if the property includes the word "rank"
    if (property.includes('rank')) {
        // Logic for properties including "rank"
        return [
            'case',
            ['<=', ['get', property], 75],
            '#1f591e', // Green
            ['<=', ['get', property], 150],
            '#ffc658', // Yellow
            '#ff6347', // Red
        ];
    } else {
        // Logic for other numeric properties
        return [
            'case',
            ['<=', ['get', property], 33],
            '#ff6347', // Red
            ['<=', ['get', property], 67],
            '#ffc658', // Yellow
            '#1f591e', // Green
        ];
    }
};
