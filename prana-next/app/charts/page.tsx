'use client';
import * as React from 'react';
import D3BarChart from '@/app/components/charts/d3-bar-chart';
import D3LineChart from '@/app/components/charts/d3-line-chart';

const biosphereData = [
    { name: 'oceans', value: 50 },
    { name: 'forests', value: 70 },
    { name: 'deserts', value: 90 },
];

const biosphereLineData = [
    {
        name: 'oceans',
        dataset1: 80,
        dataset2: 40,
        dataset3: 10,
    },
    {
        name: 'forests',
        dataset1: 20,
        dataset2: 90,
        dataset3: 60,
    },
    {
        name: 'deserts',
        dataset1: 50,
        dataset2: 75,
        dataset3: 95,
    },
];

const animalData = [
    { name: 'tigers', value: 80 },
    { name: 'lions', value: 120 },
    { name: 'jaguars', value: 100 },
    { name: 'wolves', value: 180 },
    { name: 'pumas', value: 200 },
];

export default function Charts() {
    return (
        <div className="grid grid-cols-2 gap-4 w-full h-screen p-4">
            <D3BarChart
                data={biosphereData}
                barColor="#FF6347"
                barHoverColor="#FEA122"
                xAxisTitle="Biospheres"
                yAxisTitle="Land Area"
            />
            <D3BarChart
                data={animalData}
                barColor="#AED332"
                barHoverColor="#FFD700"
                xAxisTitle="Animals"
                yAxisTitle="Habitat Area"
            />
            <D3LineChart
                data={biosphereLineData}
                datasets={[
                    'dataset1',
                    'dataset2',
                    'dataset3',
                ]}
                lineColors={[
                    '#FF6347',
                    '#5CB02C',
                    '#1A458E',
                ]}
                lineHoverColor="#FFD700"
                xAxisTitle="Biospheres"
                yAxisTitle="Values"
            />
        </div>
    );
}
