import React, { useRef, useEffect, useMemo, useState } from "react";
import { Info } from "lucide-react";
import * as d3 from "d3";
import merged_predictions from "../data/predicted/merged_predictions.json";

const WeatherChart = () => {
  const logisticRef = useRef();
  const knnRef = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Get dimensions based on screen size
  const getDimensions = () => {
    if (windowWidth < 640) {
      // Mobile
      return {
        width: windowWidth - 90,
        height: 300,
        margin: { top: 20, right: 0, bottom: 20, left: 10 },
        showLegend: false,
      };
    } else if (windowWidth < 1024) {
      // Tablet
      return {
        width: windowWidth - 180,
        height: 450,
        margin: { top: 40, right: 20, bottom: 30, left: 10 },
        showLegend: false,
      };
    } else {
      // Desktop
      return {
        width: 800,
        height: 450,
        margin: { top: 40, right: 120, bottom: 30, left: 10 },
        showLegend: true,
      };
    }
  };

  // Memoize the analysis
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
  }, [weatherData, windowWidth]);

  const createPieChart = (data, ref, title) => {
    const dimensions = getDimensions();
    const { width, height, margin, showLegend } = dimensions;

    // Adjust radius based on legend visibility
    const radius = Math.min(
      (width - margin.left - margin.right) / 2,
      (height - margin.top - margin.bottom) / 2
    );

    // Clear previous chart
    d3.select(ref).selectAll("*").remove();

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
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

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

    // Create pie layout
    const pie = d3
      .pie()
      .value((d) => d[1])
      .sort(null);

    const data_ready = pie(Object.entries(data));

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
      .attr("font-size", windowWidth < 640 ? "14px" : "18px")
      .attr("fill", "#2D3748")
      .attr("font-weight", "bold")
      .text(title);

    // Add legend only for tablet and desktop
    if (showLegend) {
      const legend = svg
        .selectAll(".legend")
        .data(data_ready)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr(
          "transform",
          (d, i) => `translate(${radius + 20}, ${i * 25 - height / 4})`
        );

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
    }

    // Add percentage in center (larger for mobile)
    const total = d3.sum(Object.values(data));
    const maxCategory = Object.entries(data).reduce((a, b) =>
      b[1] > a[1] ? b : a
    );

    // Enhanced center text for mobile
    if (windowWidth < 640) {
      // Add percentage with larger font
      svg
        .append("text")
        .attr("class", "center-stats")
        .attr("x", 0)
        .attr("y", 5)
        .attr("text-anchor", "middle")
        .attr("font-size", "24px")
        .attr("fill", "#2D3748")
        .attr("font-weight", "bold")
        .text(`${((maxCategory[1] / total) * 100).toFixed(1)}%`);

      // Add category name below percentage
      svg
        .append("text")
        .attr("class", "center-stats")
        .attr("x", 0)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "#4A5568")
        .text(maxCategory[0]);
    } else {
      // Desktop/Tablet center text
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
    }

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
      .style("font-size", windowWidth < 640 ? "10px" : "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // Enhanced touch/hover interactions
    svg
      .selectAll("path")
      .on("mouseover touchstart", function (event, d) {
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
          .style("left", `${(event.pageX || event.touches[0].pageX) + 10}px`)
          .style("top", `${(event.pageY || event.touches[0].pageY) - 10}px`);
      })
      .on("mouseout touchend", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", "translate(0, 0)");

        tooltip.style("opacity", 0);
      });
  };

  return (
    <div>
      <div ref={logisticRef} />
      <div ref={knnRef} />
    </div>
  );
};

export default WeatherChart;
