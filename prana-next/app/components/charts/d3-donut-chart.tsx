// components/D3DonutChart.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
    name: string;
    value: number;
}

interface D3DonutChartProps {
    width?: number;
    height?: number;
    data?: DataPoint[];
    title?: string;
    colorScheme?: readonly string[];
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
}

const D3DonutChart: React.FC<D3DonutChartProps> = ({
    width = 800,
    height = 600,
    data = [
        { name: 'Category 1', value: 30 },
        { name: 'Category 2', value: 70 },
        { name: 'Category 3', value: 45 },
        { name: 'Category 4', value: 60 },
        { name: 'Category 5', value: 20 },
    ],
    title,
    colorScheme = d3.schemeCategory10,
    tooltipBackgroundColor = '#1A458E',
    tooltipTextColor = 'white',
}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(
        null,
    );

    useEffect(() => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll('*').remove(); // Clear any previous content

            const radius = Math.min(width, height) / 2;

            const arc = d3
                .arc<d3.PieArcDatum<DataPoint>>()
                .innerRadius(radius * 0.5)
                .outerRadius(radius - 1);

            const pie = d3
                .pie<DataPoint>()
                .sort(null)
                .value((d) => d.value);

            const color = d3.scaleOrdinal(colorScheme);

            const g = svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${width / 2},${height / 2})`,
                );

            const tooltip = d3
                .select('body')
                .append('div')
                .attr('class', 'tooltip')
                .style('position', 'absolute')
                .style('text-align', 'center')
                .style('width', 'auto')
                .style('height', 'auto')
                .style('padding', '10px')
                .style('font', '14px sans-serif')
                .style('background', tooltipBackgroundColor)
                .style('color', tooltipTextColor)
                .style('border', '0px')
                .style('border-radius', '8px')
                .style('pointer-events', 'none')
                .style('opacity', 0)
                .style('transition', 'opacity 0.3s');

            const arcs = g
                .selectAll('.arc')
                .data(pie(data))
                .enter()
                .append('g')
                .attr('class', 'arc');

            arcs.append('path')
                .attr('fill', (d) => color(d.data.name))
                .transition()
                .duration(1000)
                .attrTween('d', function (d) {
                    const interpolate = d3.interpolate(
                        { startAngle: 0, endAngle: 0 },
                        d,
                    );
                    return (t) => arc(interpolate(t))!;
                });

            arcs.on('mouseover', function (event, d) {
                d3.select(this)
                    .select('path')
                    .attr('fill', 'orange');
                tooltip
                    .transition()
                    .duration(200)
                    .style('opacity', 0.9);
                tooltip
                    .html(
                        `<div class="tooltip-content">${d.data.name}: <span class="tooltip-value">${d.data.value}</span></div>`,
                    )
                    .style('left', event.pageX + 5 + 'px')
                    .style('top', event.pageY - 28 + 'px');
            })
                .on('mousemove', function (event) {
                    tooltip
                        .style(
                            'left',
                            event.pageX + 5 + 'px',
                        )
                        .style(
                            'top',
                            event.pageY - 28 + 'px',
                        );
                })
                .on('mouseout', function (event, d) {
                    d3.select(this)
                        .select('path')
                        .attr('fill', color(d.data.name));
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0);
                });

            arcs.append('text')
                .attr(
                    'transform',
                    (d) => `translate(${arc.centroid(d)})`,
                )
                .attr('dy', '0.35em')
                .attr('text-anchor', 'middle')
                .text((d) => d.data.name)
                .attr('font-size', '12px')
                .attr('fill', 'white');
        }
    }, [
        data,
        width,
        height,
        colorScheme,
        tooltipBackgroundColor,
        tooltipTextColor,
    ]);

    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '100%' }}
        >
            {title && (
                <h2
                    style={{
                        textAlign: 'center',
                        margin: '10px 0',
                    }}
                >
                    {title}
                </h2>
            )}
            <svg
                ref={svgRef}
                style={{
                    width: '100%',
                    height: 'calc(100% - 40px)',
                }}
                viewBox={`0 0 ${width} ${height}`}
            ></svg>
        </div>
    );
};

export default D3DonutChart;
