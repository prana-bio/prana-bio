export interface OccurancesGeo {
    type: 'FeatureCollection';
    crs: {
        type: 'name';
        properties: {
            name: string;
        };
    };
    features: Array<{
        type: 'Feature';
        properties: {
            country_name: string;
            ISO_A3: string;
            species_count: number;
        };
        geometry: {
            type: 'Polygon';
            coordinates: Array<Array<Array<number>>>;
        };
    }>;
}
