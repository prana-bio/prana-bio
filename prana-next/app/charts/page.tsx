'use client';
import * as React from 'react';
import D3BarChart from '@/app/components/charts/d3-bar-chart';

export default function Charts() {
    return (
        <section className="grid grid-cols-2 w-full">
            <D3BarChart />
            <D3BarChart />
            <D3BarChart />
            <D3BarChart />
            <D3BarChart />
            <D3BarChart />
        </section>
    );
}
