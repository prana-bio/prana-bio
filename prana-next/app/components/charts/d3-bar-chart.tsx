// components/D3BarChart.tsx
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// Define the D3BarChart component
const D3BarChart: React.FC = () => {
    // Reference to the SVG element and its container
    const svgRef = useRef<SVGSVGElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(
        null,
    );

    // Mock data to be displayed in the bar chart
    const data = [
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
        { name: 'E', value: 20 },
        { name: 'F', value: 90 },
        { name: 'G', value: 55 },
    ];

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
                bottom: 30,
                left: 40,
            };
            const innerWidth =
                width - margin.left - margin.right;
            const innerHeight =
                height - margin.top - margin.bottom;

            // Define colors
            const barColor = '#1A458E'; // Blue color from the logo
            const barHoverColor = '#5CB02C'; // Green color from the logo
            const axisColor = '#1A458E'; // Blue color for axes
            const tooltipBackgroundColor = '#1A458E'; // Blue background for tooltips
            const tooltipTextColor = 'white'; // White text for tooltips

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

            // Create the y-axis
            g.append('g')
                .call(
                    d3
                        .axisLeft(y)
                        .tickSize(-innerWidth)
                        .tickPadding(10),
                )
                .attr('color', axisColor) // Set axis color
                .append('text')
                .attr('fill', axisColor)
                .attr('y', -10)
                .attr('dy', '-1em')
                .attr('text-anchor', 'end')
                .text('Value');

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
                .attr('color', axisColor); // Set axis color

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
    }, []);

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
