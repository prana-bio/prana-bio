/* App.Contribute.Layout */
'use client';
import React from 'react';
import { Header } from '@/app/components/organisms/header';
import { Footer } from '@/app/components/organisms/footer';
import Image from 'next/image';

import { Separator } from '@/app/components/molecules/separator';
import { SidebarNav } from '@/app/components/molecules/sidebar-nav';

const ResearchLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Header />
            {/* <div className="sm:hidden">
                <Image
                    src="/examples/forms-light.png"
                    width={1280}
                    height={791}
                    alt="Forms"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/forms-dark.png"
                    width={1280}
                    height={791}
                    alt="Forms"
                    className="hidden dark:block"
                />
            </div> */}
            <div className="hidden space-y-6 p-8 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">
                        Research
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Keep up to date with the latest
                        research in biodiversity
                        conservation.
                    </p>
                </div>
                <Separator className="my-6" />
                {/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <div className="flex-1 lg:max-w-2xl"> */}
                <div className="pl-4 pr-4">{children}</div>
                {/* </div>
                </div> */}
            </div>{' '}
            <Footer />
        </>
    );
};

export default ResearchLayout;
