'use client';
import * as React from 'react';
import { useTheme } from 'next-themes';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/app/components/molecules/card';

export default function About() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MissionCard
                        emoji="🌎"
                        title="Explore"
                        description="Create software that enables individuals and entities to explore and understand biodiversity around the world in ways that were never before possible. Democratize our understanding of biodiversity conservation."
                    />
                    <MissionCard
                        emoji="🔗"
                        title="Connect"
                        description="Bring people and organizations closer together in the fight to preserve our natural world. Empowering everyone for the greater good."
                    />
                    <MissionCard
                        emoji="💸"
                        title="Finance"
                        description="Prana aims to make it easier than ever to find worthy causes, donate towards them, and track the impact of your contributions over time."
                    />
                    <MissionCard
                        emoji="🛡️"
                        title="Protect"
                        description="Protect all forms of life from the harsh impacts of pollution, habitat loss, and climate change."
                    />
                    <MissionCard
                        emoji="🏆"
                        title="Reward"
                        description="Bring exciting rewards for users and organizations, such as badges and monthly spotlights, which can be in-turn shared and linked on external sites to promote biodiversity conservation."
                    />
                    <MissionCard
                        emoji="📢"
                        title="Promote"
                        description="Bring vital awareness to the critical loss of biodiversity happening on earth. Encourage others to join the fight."
                    />
                </div>
            </div>
        </section>
    );
}

function MissionCard({ emoji, title, description }: any) {
    const { theme } = useTheme();

    return (
        <Card
            className={`flex flex-col justify-between h-full transition duration-300 ease-in-out 
    hover:border-2 ${
        theme === 'dark'
            ? 'hover:border-gray-100 hover:shadow-glowWhite'
            : 'hover:border-gray-200 hover:shadow-glowGray'
    } hover:cursor-pointer`}
        >
            {' '}
            <CardHeader>
                <div className="text-3xl text-center mb-4">
                    {emoji}
                </div>
                <CardTitle className="text-center">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription>
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}
