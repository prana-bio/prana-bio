'use client';

import React from 'react';
import D3BarChart from '@/app/components/charts/d3-bar-chart';
import D3LineChart from '@/app/components/charts/d3-line-chart';
import D3TreeMap from '@/app/components/charts/d3-tree-map';
import D3DonutChart from '@/app/components/charts/d3-donut-chart';
import d3 from 'd3';

const biosphereData = [
    { name: 'oceans', value: 50 },
    { name: 'forests', value: 70 },
    { name: 'deserts', value: 90 },
];

const biosphereLineData = [
    {
        name: 'january',
        dataset1: 80,
        dataset2: 40,
        dataset3: 10,
        dataset4: 30,
        dataset5: 70,
        dataset6: 30,
    },
    {
        name: 'february',
        dataset1: 20,
        dataset2: 90,
        dataset3: 60,
        dataset4: 120,
        dataset5: 80,
        dataset6: 90,
    },
    {
        name: 'march',
        dataset1: 50,
        dataset2: 75,
        dataset3: 95,
        dataset4: 20,
        dataset5: 50,
        dataset6: 10,
    },
    {
        name: 'april',
        dataset1: 80,
        dataset2: 40,
        dataset3: 10,
        dataset4: 30,
        dataset5: 70,
        dataset6: 30,
    },
    {
        name: 'may',
        dataset1: 20,
        dataset2: 90,
        dataset3: 60,
        dataset4: 120,
        dataset5: 80,
        dataset6: 90,
    },
    {
        name: 'june',
        dataset1: 50,
        dataset2: 75,
        dataset3: 95,
        dataset4: 20,
        dataset5: 50,
        dataset6: 10,
    },
    {
        name: 'july',
        dataset1: 80,
        dataset2: 40,
        dataset3: 10,
        dataset4: 30,
        dataset5: 70,
        dataset6: 30,
    },
    {
        name: 'august',
        dataset1: 20,
        dataset2: 90,
        dataset3: 60,
        dataset4: 120,
        dataset5: 80,
        dataset6: 90,
    },
    {
        name: 'september',
        dataset1: 15,
        dataset2: 25,
        dataset3: 3,
        dataset4: 20,
        dataset5: 90,
        dataset6: 40,
    },
];

const animalData = [
    { name: 'tigers', value: 80 },
    { name: 'lions', value: 120 },
    { name: 'jaguars', value: 100 },
    { name: 'wolves', value: 180 },
    { name: 'pumas', value: 200 },
];

const donutData = [
    { name: 'Species A', value: 10 },
    { name: 'Species B', value: 20 },
    { name: 'Species C', value: 30 },
    { name: 'Species D', value: 40 },
    { name: 'Species E', value: 50 },
];

export default function Charts() {
    return (
        <div className="grid grid-cols-3 gap-8 w-full">
            <D3LineChart
                data={biosphereLineData}
                datasets={[
                    'dataset1',
                    'dataset2',
                    'dataset3',
                    'dataset4',
                    'dataset5',
                    'dataset6',
                ]}
                lineColors={[
                    '#FF6347',
                    '#5CB02C',
                    '#1A458E',
                    '#44448E',
                    '#11158E',
                    '#FF158E',
                ]}
                xAxisTitle="Biospheres"
                yAxisTitle="Values"
            />
            <D3BarChart
                data={animalData}
                barColor="#AED332"
                barHoverColor="#FFD700"
                xAxisTitle="Animals"
                yAxisTitle="Habitat Area"
            />
            <D3TreeMap
                data={{
                    name: 'Biodiversity',
                    children: [
                        {
                            name: 'Ecosystems',
                            children: [
                                {
                                    name: 'Rainforests',
                                    value: 150,
                                },
                                {
                                    name: 'Coral Reefs',
                                    value: 200,
                                },
                                {
                                    name: 'Wetlands',
                                    value: 100,
                                },
                            ],
                        },
                        {
                            name: 'Species',
                            children: [
                                {
                                    name: 'Mammals',
                                    value: 300,
                                },
                                {
                                    name: 'Birds',
                                    value: 250,
                                },
                                {
                                    name: 'Insects',
                                    value: 400,
                                },
                            ],
                        },
                        {
                            name: 'Genetic Diversity',
                            children: [
                                {
                                    name: 'Plant Varieties',
                                    value: 350,
                                },
                                {
                                    name: 'Animal Breeds',
                                    value: 220,
                                },
                            ],
                        },
                    ],
                }}
                title="Biodiversity Overview"
                width={800}
                height={600}
                tooltipBackgroundColor="#333"
                tooltipTextColor="#fff"
            />

            <D3DonutChart
                data={donutData}
                title="Species Distribution"
                width={800}
                height={600}
                tooltipBackgroundColor="#333"
                tooltipTextColor="#fff"
            />
            {/* <D3BarChart
                data={biosphereData}
                barColor="#FF6347"
                barHoverColor="#FEA122"
                xAxisTitle="Biospheres"
                yAxisTitle="Land Area"
            /> */}
        </div>
    );
}
