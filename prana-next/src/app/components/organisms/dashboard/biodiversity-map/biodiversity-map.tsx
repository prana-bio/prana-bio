/* App.Dashboard.Viz */
'use client';
import React from 'react';
import MapboxMap from './mapbox';

const BiodiversityMap: React.FC = () => {
    return (
        <>
            {/* <p className="hidden xl:block text-muted-foreground text-sm pb-2">
                Scroll, zoom, and analyze biodiversity
                levels in different geographic regions.
            </p> */}
            <div className="w-full gap-0 h-full">
                <div className="col-span-12 md:col-span-5 h-full">
                    <div className="flex flex-col h-full">
                        <div className="w-full h-full overflow-y-hidden">
                            <MapboxMap />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BiodiversityMap;
