import React, { useRef } from 'react';
import * as d3 from 'd3';
import './Scatterplot.css';

const Scatterplot = props => {
  const chartAreaRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);

  // Graph width and height - accounting for margins
  const drawWidth = props.width - props.margin.left - props.margin.right;
  const drawHeight = props.height - props.margin.top - props.margin.bottom;

  // Calculate limits
  const xMin = d3.min(props.data, d => +d.x * 0.9);
  const xMax = d3.max(props.data, d => +d.x * 1.1);
  const yMin = d3.min(props.data, d => +d.y * 0.9);
  const yMax = d3.max(props.data, d => +d.y * 1.1);

  // Define scales
  const xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([0, drawWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([yMax, yMin])
    .range([0, drawHeight]);

  // Select all circles and bind data
  const circles = d3
    .select(chartAreaRef.current)
    .selectAll('circle')
    .data(props.data);

  // Use the .enter() method to get your entering elements, and assign their positions
  circles
    .enter()
    .append('circle')
    .merge(circles)
    .attr('r', d => props.radius)
    .attr('fill', d => props.color)
    .style('fill-opacity', 0.3)
    .transition()
    .duration(500)
    .attr('cx', d => xScale(d.x))
    .attr('cy', d => yScale(d.y))
    .style('stroke', 'black')
    .style('stroke-width', d => (d.selected === true ? '2px' : '0px'));

  // Use the .exit() and .remove() methods to remove elements that are no longer in the data
  circles.exit().remove();

  const xAxisFunction = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5, 's');

  const yAxisFunction = d3
    .axisLeft()
    .scale(yScale)
    .ticks(5, 's');

  d3.select(xAxisRef.current).call(xAxisFunction);
  d3.select(yAxisRef.current).call(yAxisFunction);

  return (
    <div className='chart-wrapper'>
      <h1 className='vs-axes'>
        {props.xTitle} vs. {props.yTitle}
      </h1>
      <svg className='chart' width={props.width} height={props.height}>
        <text transform={`translate(${props.margin.left},15)`}>
          {props.title}
        </text>
        <g
          ref={chartAreaRef}
          transform={`translate(${props.margin.left}, ${props.margin.top})`}
        />

        {/* Axes */}
        <g
          ref={xAxisRef}
          transform={`translate(${props.margin.left}, ${props.height -
            props.margin.bottom})`}
        ></g>
        <g
          ref={yAxisRef}
          transform={`translate(${props.margin.left}, ${props.margin.top})`}
        ></g>

        {/* Axis labels */}
        <text
          className='axis-label'
          transform={`translate(${props.margin.left +
            drawWidth / 2}, ${props.height - props.margin.bottom + 30})`}
        >
          {props.xTitle}
        </text>

        <text
          className='axis-label'
          transform={`translate(${props.margin.left - 30}, ${drawHeight / 2 +
            props.margin.top}) rotate(-90)`}
        >
          {props.yTitle}
        </text>
      </svg>
    </div>
  );
};

Scatterplot.defaultProps = {
  width: 800,
  height: 500,
  radius: 3,
  color: 'var(--secondary-color)',
  margin: {
    left: 50,
    right: 10,
    top: 20,
    bottom: 50
  }
};

export default Scatterplot;
