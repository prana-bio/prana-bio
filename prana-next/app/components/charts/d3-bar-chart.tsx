// components/D3BarChart.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Define the props interface
interface D3BarChartProps {
    data?: { name: string; value: number }[];
    barColor?: string;
    barHoverColor?: string;
    axisColor?: string;
    tooltipBackgroundColor?: string;
    tooltipTextColor?: string;
    gridColor?: string;
    labelColor?: string;
    xAxisTitle?: string;
    yAxisTitle?: string;
}

const D3BarChart: React.FC<D3BarChartProps> = ({
    data = [
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
        { name: 'E', value: 20 },
        { name: 'F', value: 90 },
        { name: 'G', value: 55 },
    ],
    barColor = '#1A458E',
    barHoverColor = '#5CB02C',
    axisColor = 'rgba(105, 105, 105, 0.8)', // Gray with opacity for the labels
    tooltipBackgroundColor = '#1A458E',
    tooltipTextColor = 'white',
    gridColor = 'rgba(105, 105, 105, 0.1)', // Dark gray with opacity for the grid
    labelColor = 'rgba(105, 105, 105, 0.8)', // Gray with opacity for the labels,
    xAxisTitle,
    yAxisTitle,
}) => {
    // Reference to the SVG element and its container
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(
        null,
    );

    // Function to create the chart
    const createChart = (width: number, height: number) => {
        if (svgRef.current) {
            // Select the SVG element
            const svg = d3.select(svgRef.current);

            // Clear any existing content
            svg.selectAll('*').remove();

            // Set the dimensions and margins of the chart
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

            // Create scales for the x and y axes
            const x = d3
                .scaleBand()
                .domain(data.map((d) => d.name)) // Input domain (names of the data points)
                .range([0, innerWidth]) // Output range (width of the chart)
                .padding(0.1); // Padding between the bars

            const y = d3
                .scaleLinear()
                .domain([
                    0,
                    d3.max(data, (d) => d.value) || 0,
                ]) // Input domain (0 to max value of the data)
                .range([innerHeight, 0]); // Output range (height of the chart)

            // Create a group element to contain the chart elements
            const g = svg
                .append('g')
                .attr(
                    'transform',
                    `translate(${margin.left},${margin.top})`,
                );

            // Create the y-axis with grid lines
            g.append('g')
                .call(
                    d3
                        .axisLeft(y)
                        .tickSize(-innerWidth)
                        .tickPadding(10),
                )
                .attr('color', axisColor) // Set axis color
                .selectAll('text')
                .attr('fill', labelColor); // Set label color

            g.selectAll('.tick line')
                .attr('stroke', gridColor)
                .attr('stroke-dasharray', '4 2'); // Dashed grid lines

            // Create the x-axis
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
                .attr('color', axisColor) // Set axis color
                .selectAll('text')
                .attr('fill', labelColor); // Set label color

            // Add x-axis title if provided
            if (xAxisTitle) {
                svg.append('text')
                    .attr('class', 'x-axis-title')
                    .attr('text-anchor', 'middle')
                    .attr('x', margin.left + innerWidth / 2)
                    .attr('y', height - 10)
                    .attr('fill', labelColor)
                    .text(xAxisTitle);
            }

            // Add y-axis title if provided
            if (yAxisTitle) {
                svg.append('text')
                    .attr('class', 'y-axis-title')
                    .attr('text-anchor', 'middle')
                    .attr('x', -height / 2)
                    .attr('y', 15)
                    .attr('transform', 'rotate(-90)')
                    .attr('fill', labelColor)
                    .text(yAxisTitle);
            }

            // Define a div for the tooltip
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

            // Create the bars with transitions, tooltips, and hover effects
            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', (d) => x(d.name)!)
                .attr('width', x.bandwidth())
                .attr('fill', barColor)
                .attr('opacity', 0.7) // Semi-transparent bars
                .attr('cursor', 'pointer') // Change cursor on hover
                .attr('y', innerHeight) // Start the bars at the bottom
                .attr('height', 0) // Start with height 0
                .on('mouseover', function (event, d) {
                    tooltip
                        .transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    tooltip
                        .html(
                            `<div class="tooltip-content">Value: <span class="tooltip-value">${d.value}</span></div>`,
                        )
                        .style('left', event.pageX + 'px')
                        .style(
                            'top',
                            event.pageY - 28 + 'px',
                        );

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1) // Remove opacity on hover
                        .attr('fill', barHoverColor); // Change color on hover
                })
                .on('mouseout', function () {
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0);

                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.7) // Restore opacity when not hovered
                        .attr('fill', barColor); // Restore original color
                })
                .transition() // Transition for height
                .duration(1000)
                .attr('y', (d) => y(d.value))
                .attr(
                    'height',
                    (d) => innerHeight - y(d.value),
                );
        }
    };

    // useEffect hook to create the chart and handle resizing
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
    }, [
        data,
        barColor,
        barHoverColor,
        axisColor,
        tooltipBackgroundColor,
        tooltipTextColor,
        gridColor,
        labelColor,
        xAxisTitle,
        yAxisTitle,
    ]);

    // Return the responsive container and SVG element with inline styles for tooltip content
    return (
        <div
            ref={containerRef}
            style={{ width: '100%', height: '100%' }}
        >
            <svg
                ref={svgRef}
                style={{ width: '100%', height: '100%' }}
            ></svg>
            <style jsx>{`
                .tooltip-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .tooltip-value {
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default D3BarChart;
