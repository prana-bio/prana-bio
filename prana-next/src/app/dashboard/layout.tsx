/* App.Dashboard.Layout */
'use client';
import React from 'react';

import { Header } from '@/app/components/organisms/header';
import { Footer } from '@/app/components/organisms/footer';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/app/components/molecules/tabs';
import MyImpact from '@/app/components/organisms/dashboard/my-impact/my-impact';
import BiodiversityMap from '@/app/components/organisms/dashboard/biodiversity-map/biodiversity-map';
import BiodiversityData from '@/app/components/organisms/dashboard/biodiversity-data/biodiversity-data';
import Research from '@/app/research/page';
import ContributePage from '@/app/contribute/page';
import { DashboardProvider } from '@/app/nucleus/context/dashboard-provider';
import DashboardFilters from '@/app/components/organisms/dashboard/dashboard-filters';

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Header />
            <DashboardProvider>
                <div className="hidden flex-col sm:flex">
                    <div className="flex-1 space-y-4 pl-8 pr-8 pt-4">
                        <Tabs
                            defaultValue="overview"
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between space-y-2">
                                <TabsList>
                                    <TabsTrigger value="overview">
                                        Global Explorer
                                    </TabsTrigger>
                                    {/* <TabsTrigger
                                        value="biodiversity-map"
                                        //  disabled
                                    >
                                        Biodiversity Map
                                    </TabsTrigger> */}
                                    <TabsTrigger value="biodiversity-data">
                                        Species View
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="research"
                                        disabled
                                    >
                                        Research & News 🔜
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="take-action"
                                        disabled
                                    >
                                        Take Action 🔜
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="my-impact"
                                        disabled
                                    >
                                        My Impact 🔜
                                    </TabsTrigger>
                                </TabsList>
                                <DashboardFilters />
                            </div>
                            <TabsContent
                                value="overview"
                                className="space-y-2"
                            >
                                {children}
                            </TabsContent>
                            {/* <TabsContent
                                value="biodiversity-map"
                                className="space-y-2 grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            >
                                <div className="col-span-7">
                                    <BiodiversityMap />
                                </div>
                                <div className="col-span-1"></div>
                            </TabsContent> */}
                            <TabsContent
                                value="biodiversity-data"
                                className="space-y-2 grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            >
                                <div className="col-span-7">
                                    <BiodiversityData />
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="research"
                                className="space-y-2 grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            >
                                <div className="col-span-7">
                                    <Research />
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="take-action"
                                className="space-y-2 grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            >
                                <div className="col-span-7">
                                    <ContributePage />/
                                </div>
                            </TabsContent>
                            <TabsContent
                                value="my-impact"
                                className="space-y-2"
                            >
                                <MyImpact />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </DashboardProvider>
            <Footer />
        </>
    );
};

export default DashboardLayout;
