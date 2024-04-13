/* App.Dashboard.my-impact */
'use client';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/app/components/molecules/card';
import { MyBadges } from '@/app/components/organisms/dashboard/my-impact/my-badges';
import { ContributionHistory } from '@/app/components/organisms/dashboard/birds-eye-view/contribution-history';

const MyImpact: React.FC = () => {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Area Protected
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            104 km
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +26 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Trees Planted
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            43
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +12 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Land Species Protected
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            512
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +68 from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Marine Species Protected
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            83
                        </div>
                        <p className="text-xs text-muted-foreground">
                            +59 from last month
                        </p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="sm:col-span-7 md:col-span-4">
                    <CardHeader>
                        <CardTitle>
                            My Contributions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        {/* <Overview /> */}
                    </CardContent>
                </Card>
                <Card className="sm:col-span-7 md:col-span-3">
                    <CardHeader>
                        <CardTitle>
                            Contribution History
                        </CardTitle>
                        <CardDescription>
                            You made 12 contributions this
                            year.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ContributionHistory />
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>
                            My Contributions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview />
                    </CardContent>
                </Card> */}
                <Card className="col-span-7">
                    <CardHeader>
                        <CardTitle>Badges</CardTitle>
                        <CardDescription>
                            Level up your eco-game! Earn
                            badges, champion biodiversity,
                            and share the green glory! 🌍🏆
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <MyBadges />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default MyImpact;
