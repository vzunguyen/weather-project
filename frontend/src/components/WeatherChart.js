import React, { useRef, useEffect, useMemo } from "react";
import { Info } from "lucide-react";
import * as d3 from "d3";
import merged_predictions from "../data/predicted/merged_predictions.json";

const WeatherChart = () => {
  const logisticRef = useRef();
  const knnRef = useRef();

  // Memoize the analysis to prevent unnecessary recalculations
  const weatherData = useMemo(() => {
    const analyzeWeatherTypes = (data) => {
      const analysis = {
        actualConditions: {},
        logisticRegression: {},
        knn: {},
      };

      const dataArray = data.merged_predictions;

      dataArray.forEach((entry) => {
        [
          "Actual Conditions",
          "Logistic Regression Prediction",
          "KNN Prediction",
        ].forEach((key) => {
          const category =
            key === "Actual Conditions"
              ? "actualConditions"
              : key === "Logistic Regression Prediction"
              ? "logisticRegression"
              : "knn";
          const value = entry[key];
          analysis[category][value] = (analysis[category][value] || 0) + 1;
        });
      });

      return analysis;
    };

    return analyzeWeatherTypes(merged_predictions);
  }, []);

  useEffect(() => {
    createPieChart(
      weatherData.logisticRegression,
      logisticRef.current,
      "Logistic Regression"
    );
    createPieChart(weatherData.knn, knnRef.current, "KNN");
  }, [weatherData]);

  const createPieChart = (data, ref, title) => {
    const margin = { top: 40, right: 20, bottom: 30, left: 10 };
    const width = 650 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
    const radius = Math.min(width, height) / 2;

    // Clear previous chart
    d3.select(ref).selectAll("*").remove();

    // Create color scale with custom colors for weather conditions
    const colorScale = d3.scaleOrdinal().domain(Object.keys(data)).range([
      "#4299E1", // Blue for rainy
      "#F6E05E", // Yellow for sunny
      "#718096", // Gray for cloudy
      "#9F7AEA", // Purple for stormy
      "#48BB78", // Green for partly cloudy
    ]);

    const svg = d3
      .select(ref)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr(
        "transform",
        `translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`
      );

    // Create pie layout
    const pie = d3
      .pie()
      .value((d) => d[1])
      .sort(null);

    const data_ready = pie(Object.entries(data));

    // Create gradient definitions
    const defs = svg.append("defs");
    Object.entries(data).forEach((entry, i) => {
      const gradientId = `gradient-${i}`;
      const gradient = defs
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%");

      gradient
        .append("stop")
        .attr("offset", "0%")
        .attr("stop-color", colorScale(entry[0]))
        .attr("stop-opacity", 1);

      gradient
        .append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.rgb(colorScale(entry[0])).darker(0.5))
        .attr("stop-opacity", 1);
    });

    // Create arcs
    const arcGenerator = d3
      .arc()
      .innerRadius(radius * 0.3)
      .outerRadius(radius * 0.8)
      .cornerRadius(6);

    // Add paths
    svg
      .selectAll("path")
      .data(data_ready)
      .join("path")
      .attr("d", arcGenerator)
      .attr("fill", (d, i) => `url(#gradient-${i})`)
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("opacity", 0.9)
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arcGenerator(interpolate(t));
      });

    // Add title
    svg
      .append("text")
      .attr("class", "chart-title")
      .attr("x", 0)
      .attr("y", -height / 2 + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "18px")
      .attr("fill", "#2D3748")
      .attr("font-weight", "bold")
      .text(title);

    // Add legend to the right of the chart
    const legend = svg
      .selectAll(".legend")
      .data(data_ready)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) => `translate(${radius}, ${i * 25 - height / 2})`
      ); // Position legend to the right of the chart

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("rx", 4)
      .attr("fill", (d, i) => `url(#gradient-${i})`);

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("fill", "#4A5568")
      .style("font-size", "12px")
      .text((d) => d.data[0]);

    // Add percentage in center
    const total = d3.sum(Object.values(data));
    const maxCategory = Object.entries(data).reduce((a, b) =>
      b[1] > a[1] ? b : a
    );

    svg
      .append("text")
      .attr("class", "center-stats")
      .attr("x", 0)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#2D3748")
      .text(`${maxCategory[0]}`);

    svg
      .append("text")
      .attr("class", "center-stats")
      .attr("x", 0)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "14px")
      .attr("fill", "#4A5568")
      .text(`${((maxCategory[1] / total) * 100).toFixed(1)}%`);

    // Add tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "8px")
      .style("background", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Add hover interactions
    svg
      .selectAll("path")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function (d) {
            const centroid = arcGenerator.centroid(d);
            return `translate(${centroid[0] * 0.05}, ${centroid[1] * 0.05})`;
          });

        tooltip
          .style("opacity", 1)
          .html(
            `
            ${d.data[0]}<br/>
            Count: ${d.data[1]}<br/>
            Percentage: ${((d.data[1] / total) * 100).toFixed(1)}%
          `
          )
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 10}px`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0, 0)");

        tooltip.style("opacity", 0);
      });
  };

  return (
    <div className="w-full mx-auto bg-gradient-to-br from-white to-gray-50">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">
          Comparing predictions between Logistic Regression and KNN models
        </p>
      </div>
      <div>
        <div>
          <div
            ref={logisticRef}
            className=" rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
          />
          <div
            ref={knnRef}
            className="rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherChart;
