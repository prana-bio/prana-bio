import React from 'react';
import { useTheme } from 'next-themes';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/app/components/molecules/card';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/app/components/molecules/hover-card';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Icons } from '@/app/components/atoms/icons';

const EPICard: React.FC<EPICardProps> = ({
    name,
    abbreviation,
    description,
    score,
    rank,
    change,
    loading,
    error,
    isSelected,
    onClick,
}) => {
    const { theme } = useTheme();
    return (
        <div
            onClick={onClick}
            className={`${
                isSelected
                    ? theme == 'dark'
                        ? 'border-2 border-gray-100'
                        : 'border-2 border-gray-400'
                    : 'border border-transparent hover:border-gray-200'
            } rounded-xl transition duration-150 ease-in-out`}
        >
            {loading ? (
                <Card className="shadow-md flex justify-center items-center">
                    <Icons.spinner className="animate-spin h-4 w-4 m-14 text-primary" />
                </Card>
            ) : (
                <HoverCard>
                    <Card className="shadow-md flex flex-col justify-between min-h-[140px] cursor-pointer">
                        <CardHeader className="flex flex-row justify-between items-top space-y-0 pb-2">
                            <HoverCardTrigger>
                                <CardTitle className="font-medium text-xs cursor-pointer">
                                    {name}
                                </CardTitle>
                            </HoverCardTrigger>
                            <CardDescription className="font-light text-gray-400 text-xs pl-2">
                                Rank
                                <p
                                    className={`font-semibold ${
                                        rank <= 75
                                            ? 'text-primary'
                                            : rank <= 150
                                            ? 'text-warning'
                                            : 'text-destructive'
                                    }`}
                                >
                                    #{rank}
                                </p>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                className={`text-2xl font-bold ${
                                    score >= 66
                                        ? 'text-primary'
                                        : score >= 33
                                        ? 'text-warning'
                                        : 'text-destructive'
                                }`}
                            >
                                {score}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {change >= 0
                                    ? `+${change}%`
                                    : `${change}%`}{' '}
                                past 10 years
                            </p>
                        </CardContent>
                    </Card>
                    <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">
                                    {name} ({abbreviation})
                                </h4>
                                <p className="text-sm">
                                    {description}
                                </p>
                                <div className="flex items-center pt-2">
                                    <InfoCircledIcon className="mr-2 h-4 w-4 opacity-70" />
                                    <span className="text-xs text-muted-foreground">
                                        2022 Environmental
                                        Performance Index
                                        (EPI)
                                    </span>
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )}
        </div>
    );
};

export default EPICard;

interface EPICardProps {
    name: string;
    abbreviation: string;
    rank: number;
    description: string;
    score: number;
    change: number;
    loading: boolean;
    error: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}