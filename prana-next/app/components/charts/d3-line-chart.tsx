// components/D3LineChart.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Define the props interface
interface DataPoint {
    name: string;
    [key: string]: number | string;
}

interface D3LineChartProps {
    data?: DataPoint[];
    datasets?: string[];
    lineColors?: string[];
    axisColor?: string;
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
    gridColor?: string;
    labelColor?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

const D3LineChart: React.FC<D3LineChartProps> = ({
    data = [
        { name: 'oceans', dataset1: 50, dataset2: 40 },
        { name: 'forests', dataset1: 70, dataset2: 65 },
        { name: 'deserts', dataset1: 90, dataset2: 80 },
    ],
    datasets = ['dataset1', 'dataset2'],
    lineColors = ['#1A458E', '#5CB02C'],
    axisColor = 'rgba(105, 105, 105, 0.8)',
    tooltipBackgroundColor = '#1A458E',
    tooltipTextColor = 'white',
    gridColor = 'rgba(105, 105, 105, 0.1)',
    labelColor = 'rgba(105, 105, 105, 0.8)',
    xAxisTitle,
    yAxisTitle,
}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(
        null,
    );

    const createChart = (width: number, height: number) => {
        if (svgRef.current) {
            const svg = d3.select(svgRef.current);
            svg.selectAll('*').remove();

            const margin = {
                top: 20,
                right: 20,
                bottom: 50,
                left: 50,
            };
            const innerWidth =
                width - margin.left - margin.right;
            const innerHeight =
                height - margin.top - margin.bottom;

            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.name))
                .range([0, innerWidth])
                .padding(0.1);

            const y = d3
                .scaleLinear()
                .domain([
                    0,
                    d3.max(
                        data.flatMap((d) =>
                            datasets.map(
                                (key) => d[key] as number,
                            ),
                        ),
                    ) || 0,
                ])
                .range([innerHeight, 0]);

            const line = d3
                .line<{ name: string; value: number }>()
                .x((d) => x(d.name)! + x.bandwidth() / 2)
                .y((d) => y(d.value))
                .curve(d3.curveMonotoneX);

            const g = svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${margin.left},${margin.top})`,
                );

            g.append('g')
                .call(
                    d3
                        .axisLeft(y)
                        .tickSize(-innerWidth)
                        .tickPadding(10),
                )
                .attr('color', axisColor)
                .selectAll('text')
                .attr('fill', labelColor);

            g.selectAll('.tick line')
                .attr('stroke', gridColor)
                .attr('stroke-dasharray', '4 2');

            g.append('g')
                .call(
                    d3
                        .axisBottom(x)
                        .tickSize(0)
                        .tickPadding(10),
                )
                .attr(
                    'transform',
                    `translate(0,${innerHeight})`,
                )
                .attr('color', axisColor)
                .selectAll('text')
                .attr('fill', labelColor);

            if (xAxisTitle) {
                svg.append('text')
                    .attr('class', 'x-axis-title')
                    .attr('text-anchor', 'middle')
                    .attr('x', margin.left + innerWidth / 2)
                    .attr('y', height - 10)
                    .attr('fill', labelColor)
                    .text(xAxisTitle);
            }

            if (yAxisTitle) {
                svg.append('text')
                    .attr('class', 'y-axis-title')
                    .attr('text-anchor', 'middle')
                    .attr(
                        'x',
                        -margin.top - innerHeight / 2,
                    )
                    .attr('y', 15)
                    .attr('transform', 'rotate(-90)')
                    .attr('fill', labelColor)
                    .text(yAxisTitle);
            }

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

            datasets.forEach((dataset, index) => {
                const lineData = data.map((d) => ({
                    name: d.name,
                    value: d[dataset] as number,
                }));
                const linePath = g
                    .append('path')
                    .datum(lineData)
                    .attr('fill', 'none')
                    .attr(
                        'stroke',
                        lineColors[
                            index % lineColors.length
                        ],
                    )
                    .attr('stroke-width', 2)
                    .attr('d', line)
                    .attr('class', 'line');

                const totalLength = (
                    linePath.node() as SVGPathElement
                ).getTotalLength();
                linePath
                    .attr(
                        'stroke-dasharray',
                        `${totalLength} ${totalLength}`,
                    )
                    .attr('stroke-dashoffset', totalLength)
                    .transition()
                    .duration(2000)
                    .ease(d3.easeLinear)
                    .attr('stroke-dashoffset', 0);

                // Adding event listeners outside the transition to avoid timing issues
                linePath
                    .on('mouseover', function () {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('stroke-width', 4);

                        d3.selectAll('.line')
                            .filter(function () {
                                return (
                                    this !== linePath.node()
                                );
                            })
                            .transition()
                            .duration(200)
                            .attr('opacity', 0.3);
                    })
                    .on('mouseout', function () {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('stroke-width', 2);

                        d3.selectAll('.line')
                            .transition()
                            .duration(200)
                            .attr('opacity', 1);
                    });

                const points = g
                    .selectAll(`.point-${dataset}`)
                    .data(lineData)
                    .enter()
                    .append('circle')
                    .attr('class', `point point-${dataset}`)
                    .attr(
                        'cx',
                        (d) =>
                            x(d.name)! + x.bandwidth() / 2,
                    )
                    .attr('cy', (d) => y(d.value))
                    .attr('r', 5)
                    .attr(
                        'fill',
                        lineColors[
                            index % lineColors.length
                        ],
                    )
                    .attr('cursor', 'pointer')
                    .on('mouseover', function (event, d) {
                        tooltip
                            .transition()
                            .duration(200)
                            .style('opacity', 0.9);
                        tooltip
                            .html(
                                `<div class="tooltip-content">Value: <span class="tooltip-value">${d.value}</span></div>`,
                            )
                            .style(
                                'left',
                                event.pageX + 'px',
                            )
                            .style(
                                'top',
                                event.pageY - 28 + 'px',
                            );

                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('r', 7);

                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('opacity', 1);
                    })
                    .on('mouseout', function () {
                        tooltip
                            .transition()
                            .duration(500)
                            .style('opacity', 0);

                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr('r', 5)
                            .attr(
                                'fill',
                                lineColors[
                                    index %
                                        lineColors.length
                                ],
                            );
                    });
            });
        }
    };

    useEffect(() => {
        const container = containerRef.current;
        const svg = svgRef.current;

        if (container && svg) {
            const resizeObserver = new ResizeObserver(
                (entries) => {
                    for (let entry of entries) {
                        const { width, height } =
                            entry.contentRect;
                        createChart(width, height);
                    }
                },
            );

            resizeObserver.observe(container);

            return () =>
                resizeObserver.unobserve(container);
        }
    }, [data, datasets, lineColors]);

    return (
        <div
            ref={containerRef}
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            <svg
                ref={svgRef}
                style={{ width: '100%', height: '100%' }}
            ></svg>
        </div>
    );
};

export default D3LineChart;
