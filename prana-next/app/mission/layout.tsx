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
import ReleaseTimeline from '@/app/components/organisms/mission/release-timeline';
import FAQ from '@/app/components/organisms/mission/faq';
import { UserSessionProvider } from '@/app/nucleus/context/user-provider';

const AboutLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <UserSessionProvider>
                <Header />
                <div className="hidden flex-col sm:flex">
                    <div className="flex-1 space-y-4 pl-8 pr-8 pt-4">
                        {/* <div className="flex items-center justify-between space-y-2">
                        <p className="hidden xl:block text-muted-foreground text-sm">
                            Track our progress towards
                            biodiversity conservation around
                            the world.
                        </p>
                        <p></p>
                    </div> */}
                        <Tabs
                            defaultValue="our-mission"
                            className="space-y-4"
                        >
                            <div className="flex items-center justify-between space-y-2">
                                <TabsList>
                                    <TabsTrigger value="our-mission">
                                        Our Mission
                                    </TabsTrigger>
                                    <TabsTrigger value="release-timeline">
                                        Release Timeline
                                    </TabsTrigger>
                                    <TabsTrigger value="faq">
                                        FAQ
                                    </TabsTrigger>
                                </TabsList>
                            </div>
                            <TabsContent
                                value="our-mission"
                                className="space-y-2"
                            >
                                {children}
                            </TabsContent>
                            <TabsContent
                                value="release-timeline"
                                className="space-y-2"
                            >
                                <ReleaseTimeline />
                            </TabsContent>
                            <TabsContent
                                value="faq"
                                className="space-y-2 grid gap-4 md:grid-cols-2 lg:grid-cols-7"
                            >
                                <div className="col-span-7">
                                    <FAQ />
                                </div>
                                <div className="col-span-1"></div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <Footer />
            </UserSessionProvider>
        </>
    );
};

export default AboutLayout;
