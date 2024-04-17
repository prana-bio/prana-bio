import { BiodiversityRanking } from '@/app/types/BiodiversityRanking';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LabelList,
    Cell,
    Label,
} from 'recharts';
import { getOrdinalSuffix } from '@/app/nucleus/slice-and-dice';
import { useDashboardFilters } from '@/app/nucleus/context/dashboard-provider';

const BiodiversityRankingChart: React.FC<
    BiodiversityRankingProps
> = ({ biodiversityRanking, loading, error, onClick }) => {
    const { dashboardFilters, updatePropertySelected } =
        useDashboardFilters();

    const { theme } = useTheme();

    const [selectedBarIndex, setSelectedBarIndex] =
        useState<number | null>(null);

    const [activeIndex, setActiveIndex] = useState<
        number | null
    >(null);

    const onMouseOver = (data: any, index: number) => {
        setActiveIndex(index);
    };

    const onMouseOut = () => {
        setActiveIndex(null);
    };

    const handleBarClick = (index: number) => {
        setSelectedBarIndex(index);
    };

    const getBarColor = (rank: number) => {
        return rank <= 75
            ? // ? '#16a34a'
              `#1f591e`
            : rank <= 150
            ? '#ffc658'
            : '#ff6347';
    };

    const propertyToCategory = (property: string) => {
        return (
            property
                .replace('_rank', '')
                .charAt(0)
                .toUpperCase() +
            property.slice(1).replace('_rank', '')
        );
    };

    useEffect(() => {
        if (
            typeof dashboardFilters.propertySelected ===
            'string'
        ) {
            const currentCategory = propertyToCategory(
                dashboardFilters.propertySelected,
            );
            const categoryIndex = chartData.findIndex(
                (entry) =>
                    entry.category === currentCategory,
            );

            if (categoryIndex === -1) {
                setSelectedBarIndex(null);
            } else {
                setSelectedBarIndex(categoryIndex);
            }
        } else {
            setSelectedBarIndex(null);
        }
    }, [dashboardFilters.propertySelected]);

    const CustomTooltip = ({
        active,
        payload,
    }: {
        active?: boolean;
        payload?: any[];
    }) => {
        if (active && payload && payload.length) {
            const rank = payload[0].payload.rank;
            const ordinalSuffix = getOrdinalSuffix(rank);
            return (
                <div className="bg-black bg-opacity-75 text-white p-2 border-0 rounded text-xs">
                    <p>{`${rank}${ordinalSuffix} most ${payload[0].payload.category.toLowerCase()} in the world`}</p>
                </div>
            );
        }
        return null;
    };

    const chartData = [
        {
            category: 'Amphibians',
            value: biodiversityRanking.amphibians,
            rank: biodiversityRanking.amphibians_rank,
        },
        {
            category: 'Birds',
            value: biodiversityRanking.birds,
            rank: biodiversityRanking.birds_rank,
        },
        {
            category: 'Fish',
            value: biodiversityRanking.fish,
            rank: biodiversityRanking.fish_rank,
        },
        {
            category: 'Mammals',
            value: biodiversityRanking.mammals,
            rank: biodiversityRanking.mammals_rank,
        },
        {
            category: 'Reptiles',
            value: biodiversityRanking.reptiles,
            rank: biodiversityRanking.reptiles_rank,
        },
        {
            category: 'Plants',
            value: biodiversityRanking.plants,
            rank: biodiversityRanking.plants_rank,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 20,
                    left: 20,
                    bottom: 20,
                }}
                layout="horizontal"
            >
                <CartesianGrid
                    //   stroke="#5A5453"
                    stroke={
                        theme === 'dark'
                            ? '#5A5453'
                            : '#D0D0D0'
                    }
                    strokeDasharray="5 15 5"
                    vertical={true}
                />
                <XAxis dataKey="category" height={50}>
                    <Label
                        value="Species Group"
                        position="bottom"
                    />
                </XAxis>
                <YAxis width={80}>
                    <Label
                        value="Count"
                        angle={-90}
                        position="left"
                        offset={0}
                    />
                </YAxis>
                <Tooltip
                    cursor={false}
                    content={<CustomTooltip />}
                />
                <Bar
                    dataKey="value"
                    onMouseOut={onMouseOut}
                    onClick={(data, index, event) => {
                        event?.stopPropagation();
                        const category = data.category;
                        const categoryRank = `${category.toLowerCase()}_rank`;
                        setSelectedBarIndex(index);
                        updatePropertySelected(
                            categoryRank,
                        );
                        handleBarClick(index);
                    }}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={getBarColor(entry.rank)}
                            stroke={
                                selectedBarIndex === index
                                    ? theme === 'dark'
                                        ? 'whitesmoke'
                                        : '#696969'
                                    : 'none'
                            }
                            cursor="pointer"
                            strokeWidth={
                                selectedBarIndex === index
                                    ? 2
                                    : 0
                            }
                            onMouseOver={() =>
                                onMouseOver(entry, index)
                            }
                            onClick={() =>
                                handleBarClick(index)
                            }
                            opacity={
                                activeIndex === index
                                    ? 1
                                    : 0.75
                            }
                        />
                    ))}
                    <LabelList
                        dataKey="value"
                        position="top"
                        style={{
                            fill:
                                theme === 'dark'
                                    ? 'whitesmoke'
                                    : '#696969',
                            fontWeight: '500',
                            opacity: '.6',
                            fontSize: 'smaller',
                            strokeWidth: 0.25,
                        }}
                        formatter={(value: number) =>
                            new Intl.NumberFormat(
                                'en-US',
                            ).format(value)
                        }
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BiodiversityRankingChart;

interface BiodiversityRankingProps {
    biodiversityRanking: BiodiversityRanking;
    loading: boolean;
    error: boolean;
    onClick: (categoryRank: string) => void;
}
