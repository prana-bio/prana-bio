// /* App.Research.Page */
// 'use client';
// import React from 'react';

// const Research: React.FC = () => {
//     return <></>;
// };

// export default Research;

// import { Metadata } from 'next';
import Image from 'next/image';

import { cn } from '@/app/nucleus/utils';
import { DemoGithub } from '@/app/components/molecules/github-card';
import { ArticleCard } from '@/app/components/organisms/research/article-card';
import { Article } from '@/app/types/Article';

// import { DemoCookieSettings } from "@/app/components/shadcn/cookie-settings"
// import { DemoCreateAccount } from "./components/create-account"
// import { DemoDatePicker } from "./components/date-picker"
// import { DemoGithub } from "./components/github-card"
// import { DemoNotifications } from "./components/notifications"
// import { DemoPaymentMethod } from "./components/payment-method"
// import { DemoReportAnIssue } from "./components/report-an-issue"
// import { DemoShareDocument } from "./components/share-document"
// import { DemoTeamMembers } from "./components/team-members"

// export const metadata: Metadata = {
//     title: 'Cards',
//     description:
//         'Examples of cards built using the components.',
// };

const exampleArticles: Article[] = [
    {
        title: 'The Impact of Biodiversity on Ecosystem Stability',
        description:
            'Exploring the relationship between biodiversity and the stability of ecosystems. How changes in biodiversity can affect the overall health of natural environments.',
        source: 'Nature',
        bookmarks: 20,
        date: 'November 5th, 2023',
        image: '/orca.jpg',
    },
    {
        title: 'Conserving Endangered Species: A Global Effort',
        description:
            'A comprehensive look at the international initiatives and strategies employed to protect and conserve endangered species across the globe.',
        source: 'National Geographic',
        bookmarks: 15,
        date: 'October 22nd, 2023',
        image: '/agave.jpeg',
    },
    {
        title: 'The Role of Technology in Wildlife Conservation',
        description:
            'Examining how cutting-edge technologies such as drones and AI are being used to monitor and protect wildlife, revolutionizing conservation efforts.',
        source: 'Scientific American',
        bookmarks: 18,
        date: 'September 30th, 2023',
        image: '/dakota.jpg',
    },
    {
        title: 'Conserving Endangered Species: A Global Effort',
        description:
            'A comprehensive look at the international initiatives and strategies employed to protect and conserve endangered species across the globe.',
        source: 'National Geographic',
        bookmarks: 15,
        date: 'October 22nd, 2023',
        image: '/orca.jpg',
    },
];

function DemoContainer({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'flex items-center justify-center [&>div]:w-full',
                className,
            )}
            {...props}
        />
    );
}

const Research: React.FC = () => {
    return (
        <>
            <p className="hidden xl:block text-muted-foreground text-sm pb-2">
                Dive deeper with scientific writings, blogs,
                and press releases related to biodiversity.
            </p>
            <div className="hidden items-start justify-center gap-6 rounded-lg md:grid lg:grid-cols-2 xl:grid-cols-3">
                {exampleArticles.map((article, index) => (
                    <DemoContainer key={index}>
                        <ArticleCard article={article} />
                    </DemoContainer>
                ))}
            </div>
        </>
    );
};

export default Research;
