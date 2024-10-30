import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Plotly from 'plotly.js/dist/plotly';

const Charts = () => {
    const [data, setData] = useState([]);

    // Load CSV data
    useEffect(() => {
        d3.csv('merged_cleaned_dataset.csv').then((data) => {
            setData(data.map(d => ({
                temp: +d.temp, // convert to number
                //electricityUsage: +d.electricityUsage,
                condition: d.condition,
            })));
        });
    }, []);

    // Create Temperature Line Chart
    useEffect(() => {
        if (data.length === 0) return;

        const svg = d3.select('#temperatureChart')
            .attr('width', 500)
            .attr('height', 300);

        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.temperature))
            .range([0, 500]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.electricityUsage)])
            .range([300, 0]);

        const line = d3.line()
            .x(d => xScale(d.temperature))
            .y(d => yScale(d.electricityUsage));

        svg.append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', line)
            .style('fill', 'none')
            .style('stroke', 'blue');

        svg.append('g')
            .attr('transform', 'translate(0,300)')
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .call(d3.axisLeft(yScale));
    }, [data]);

// Create Weather Condition Bar Chart
useEffect(() => {
    if (data.length === 0) return;

    // Count occurrences of each weather condition
    const weatherConditions = {};
    data.forEach(d => {
        weatherConditions[d.weatherCondition] = (weatherConditions[d.weatherCondition] || 0) + 1;
    });

    // Prepare the data for the bar chart
    const trace = {
        x: Object.keys(weatherConditions), // Weather conditions as x-axis
        y: Object.values(weatherConditions), // Counts as y-axis
        type: 'bar', // Change type to 'bar' for bar chart
        marker: {
            color: 'blue' // Optional: Set the color of the bars
        }
    };

    const layout = {
        title: 'Weather Conditions Count',
        xaxis: { title: 'Weather Conditions' },
        yaxis: { title: 'Number of Days' },
    };

    // Render the bar chart
    Plotly.newPlot('weatherPredictionChart', [trace], layout);
}, [data]);


    return (
        <div>
            <h2>Temperature vs Electricity Usage</h2>
            <svg id="temperatureChart"></svg>

            <h2>Weather Condition</h2>
            <div id="weatherPredictionChart"></div>
        </div>
    );
};

export default Charts;
