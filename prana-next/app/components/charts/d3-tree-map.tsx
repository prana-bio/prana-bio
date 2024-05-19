// components/D3TreeMap.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface DataPoint {
    name: string;
    value?: number;
    children?: DataPoint[];
}

interface D3TreeMapProps {
    width?: number;
    height?: number;
    data?: DataPoint;
    title?: string;
    colorScheme?: readonly string[];
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
}

// Extend the HierarchyRectangularNode interface to include the layout properties
interface ExtendedHierarchyRectangularNode
    extends d3.HierarchyRectangularNode<DataPoint> {
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

const D3TreeMap: React.FC<D3TreeMapProps> = ({
    width = 800,
    height = 600,
    data = {
        name: 'root',
        children: [
            {
                name: 'Category 1',
                value: 100,
            },
            {
                name: 'Category 2',
                value: 200,
            },
            {
                name: 'Category 3',
                value: 300,
            },
        ],
    },
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

            const root = d3
                .hierarchy(data)
                .sum((d) => d.value ?? 0)
                .sort(
                    (a, b) =>
                        (b.value ?? 0) - (a.value ?? 0),
                );

            const treemapLayout = d3
                .treemap<DataPoint>()
                .size([width, height])
                .padding(1);

            treemapLayout(root);

            const color = d3.scaleOrdinal(colorScheme);

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

            const nodes = svg
                .selectAll('rect')
                .data(
                    root.leaves() as ExtendedHierarchyRectangularNode[],
                )
                .enter()
                .append('rect')
                .attr('x', (d) => d.x0)
                .attr('y', (d) => d.y1) // Start from the bottom
                .attr('width', (d) => d.x1 - d.x0)
                .attr('height', 0) // Start with height 0
                .attr('fill', (d) => color(d.data.name))
                .attr('stroke', '#fff')
                .attr('stroke-width', 1)
                .on('mouseover', function (event, d) {
                    d3.select(this).attr('fill', 'orange');
                    tooltip
                        .transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    tooltip
                        .html(
                            `<div class="tooltip-content">${d.data.name}: <span class="tooltip-value">${d.value}</span></div>`,
                        )
                        .style(
                            'left',
                            event.pageX + 5 + 'px',
                        )
                        .style(
                            'top',
                            event.pageY - 28 + 'px',
                        );
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
                    d3.select(this).attr(
                        'fill',
                        color(d.data.name),
                    );
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0);
                });

            nodes
                .transition()
                .duration(1000)
                .ease(d3.easeBounceOut)
                .attr('y', (d) => d.y0) // Transition to the correct position
                .attr('height', (d) => d.y1 - d.y0); // Transition to the correct height

            svg.selectAll('text')
                .data(
                    root.leaves() as ExtendedHierarchyRectangularNode[],
                )
                .enter()
                .append('text')
                .attr('x', (d) => d.x0 + 5)
                .attr('y', (d) => d.y0 + 20)
                .text((d) => d.data.name)
                .attr('font-size', '15px')
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

export default D3TreeMap;
