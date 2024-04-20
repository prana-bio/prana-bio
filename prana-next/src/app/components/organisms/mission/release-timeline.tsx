import * as React from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/app/components/molecules/card';

export default function ReleaseTimeline() {
    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col space-y-4">
                    <TimelineItem
                        date="2024-04-20"
                        title="Version 0.1 Release"
                        description="Initial beta release for Earth Day 2024."
                    />
                </div>
            </div>
        </section>
    );
}

const TimelineItem = ({
    date,
    title,
    description,
}: any) => {
    return (
        <div className="flex items-center">
            <div className="p-4 text-center">
                <div className="text-md font-normal">
                    {date}
                </div>
            </div>
            <Card className="flex-grow mx-4">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
};
