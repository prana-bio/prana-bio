/* App.Charts.Layout */
'use client';
import React from 'react';

import { Header } from '@/app/components/organisms/header';
import { Footer } from '@/app/components/organisms/footer';
import { UserSessionProvider } from '@/app/nucleus/context/user-provider';

const ChartsLayout = ({
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
                        <div className="flex items-center justify-between space-y-2">
                            {children}
                        </div>
                    </div>
                </div>
                <Footer />
            </UserSessionProvider>
        </>
    );
};

export default ChartsLayout;
