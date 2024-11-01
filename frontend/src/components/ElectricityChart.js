import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ElectricityChart = () => {
  const svgRef = useRef();

  const dataPoints = [
    { temperature: 24.3, actualUsage: 638801.1, predictedUsage: 1118953.77 },
    { temperature: 3.3, actualUsage: 587241.7, predictedUsage: 928549.7 },
    { temperature: 5.2, actualUsage: 740396.2, predictedUsage: 934739.83 },
    { temperature: 16.4, actualUsage: 711403.6, predictedUsage: 1015642.56 },
    { temperature: 15.6, actualUsage: 254003.8, predictedUsage: 1007326.84 },
    { temperature: 26.6, actualUsage: 2408573.0, predictedUsage: 1156312.22 },
    { temperature: 27.0, actualUsage: 528523.7, predictedUsage: 1163146.56 },
    { temperature: 26.5, actualUsage: 362205.6, predictedUsage: 1154619.26 },
    { temperature: 11.2, actualUsage: 1649385.0, predictedUsage: 968591.69 },
    { temperature: -4.1, actualUsage: 587241.7, predictedUsage: 925019.5 },
    { temperature: -3.4, actualUsage: 3903823.0, predictedUsage: 923958.28 },
    { temperature: 17.8, actualUsage: 293107.7, predictedUsage: 1031141.21 },
    { temperature: 8.2, actualUsage: 644861.6, predictedUsage: 948941.86 },
    { temperature: 20.1, actualUsage: 151258.0, predictedUsage: 1059224.35 },
    { temperature: 23.4, actualUsage: 968746.9, predictedUsage: 1105232.64 },
    { temperature: 4.4, actualUsage: 1747347.0, predictedUsage: 931868.97 },
    { temperature: 12.0, actualUsage: 236858.5, predictedUsage: 974755.44 },
    { temperature: 25.6, actualUsage: 121356.3, predictedUsage: 1139663.82 },
    { temperature: 6.9, actualUsage: 469706.8, predictedUsage: 942120.48 },
    { temperature: 4.6, actualUsage: 199528.2, predictedUsage: 932550.59 },
    { temperature: 29.8, actualUsage: 759990.4, predictedUsage: 1213793.55 },
    { temperature: 3.3, actualUsage: 893415.6, predictedUsage: 928549.7 },
    { temperature: 9.7, actualUsage: 293107.7, predictedUsage: 958083.98 },
    { temperature: 18.3, actualUsage: 577043.9, predictedUsage: 1036968.74 },
    { temperature: 9.7, actualUsage: 1216259.0, predictedUsage: 958083.98 },
    { temperature: 15.9, actualUsage: 201214.8, predictedUsage: 1010399.21 },
    { temperature: 15.7, actualUsage: 660237.9, predictedUsage: 1008344.83 },
    { temperature: 23.8, actualUsage: 282764.8, predictedUsage: 1111268.7 },
    { temperature: 6.7, actualUsage: 489404.1, predictedUsage: 941161.69 },
    { temperature: 16.9, actualUsage: 141971.9, predictedUsage: 1021039.45 },
    { temperature: 18.7, actualUsage: 462247.3, predictedUsage: 1041741.67 },
    { temperature: 0.3, actualUsage: 825563.8, predictedUsage: 923183.08 },
    { temperature: 2.6, actualUsage: 445546.4, predictedUsage: 926815.54 },
    { temperature: 17.3, actualUsage: 1045781.0, predictedUsage: 1025467.61 },
    { temperature: 13.6, actualUsage: 918154.7, predictedUsage: 988253.56 },
    { temperature: 20.3, actualUsage: 561652.8, predictedUsage: 1061820.72 },
    { temperature: 13.5, actualUsage: 918154.7, predictedUsage: 987364.14 },
    { temperature: 8.7, actualUsage: 206974.1, predictedUsage: 951837.72 },
    { temperature: 9.8, actualUsage: 247441.9, predictedUsage: 958741.97 },
    { temperature: 16.0, actualUsage: 1149443.0, predictedUsage: 1011435.6 },
    { temperature: -7.0, actualUsage: 355610.1, predictedUsage: 932502.28 },
    { temperature: 3.7, actualUsage: 4655198.0, predictedUsage: 929672.63 },
    { temperature: 28.1, actualUsage: 267634.2, predictedUsage: 1182457.35 },
    { temperature: 17.8, actualUsage: 698002.9, predictedUsage: 1031141.21 },
    { temperature: 16.7, actualUsage: 852013.4, predictedUsage: 1018862.26 },
    { temperature: 7.7, actualUsage: 1793306.0, predictedUsage: 946197.32 },
    { temperature: 4.3, actualUsage: 476897.6, predictedUsage: 931537.18 },
    { temperature: 19.1, actualUsage: 1247569.0, predictedUsage: 1046613.26 },
    { temperature: 11.8, actualUsage: 4373708.0, predictedUsage: 973177.96 },
    { temperature: 6.7, actualUsage: 1480514.0, predictedUsage: 941161.69 },
    { temperature: -11.6, actualUsage: 753529.3, predictedUsage: 954519.6 },
    { temperature: 4.0, actualUsage: 663676.8, predictedUsage: 930577.87 },
    { temperature: 19.0, actualUsage: 660237.9, predictedUsage: 1045386.11 },
    { temperature: 9.8, actualUsage: 3137241.0, predictedUsage: 958741.97 },
    { temperature: 23.1, actualUsage: 473223.2, predictedUsage: 1100770.88 },
    { temperature: 16.8, actualUsage: 216271.2, predictedUsage: 1019947.78 },
    { temperature: 7.1, actualUsage: 824215.7, predictedUsage: 943103.44 },
    { temperature: 25.9, actualUsage: 1078645.0, predictedUsage: 1144592.76 },
    { temperature: 13.4, actualUsage: 206974.1, predictedUsage: 986480.83 },
    {
      temperature: 6.5,
      actualUsage: 473223.2,
      predictedUsage: 940227.0377848427,
    },
    {
      temperature: 10.4,
      actualUsage: 350290.8,
      predictedUsage: 962817.4144268974,
    },
    {
      temperature: 4.6,
      actualUsage: 178570.1,
      predictedUsage: 932550.591696651,
    },
    {
      temperature: 4.1,
      actualUsage: 3227914.0,
      predictedUsage: 930891.6321852517,
    },
    {
      temperature: 13.3,
      actualUsage: 1814276.0,
      predictedUsage: 985603.6251421055,
    },
    {
      temperature: 15.4,
      actualUsage: 498645.8,
      predictedUsage: 1005309.2586641733,
    },
    {
      temperature: 5.9,
      actualUsage: 554576.7,
      predictedUsage: 937567.8917317033,
    },
    {
      temperature: 8.0,
      actualUsage: 968746.9,
      predictedUsage: 947825.8888986983,
    },
    {
      temperature: 11.4,
      actualUsage: 740396.2,
      predictedUsage: 970096.0936372307,
    },
    {
      temperature: 9.5,
      actualUsage: 811837.6,
      predictedUsage: 956786.2055797763,
    },
    {
      temperature: 10.7,
      actualUsage: 236203.7,
      predictedUsage: 964937.1620322972,
    },
    {
      temperature: 30.7,
      actualUsage: 852909.5,
      predictedUsage: 1231118.4640847554,
    },
    {
      temperature: 29.5,
      actualUsage: 663676.8,
      predictedUsage: 1208131.773528698,
    },
    {
      temperature: 3.0,
      actualUsage: 3206332.0,
      predictedUsage: 927770.5113819657,
    },
    {
      temperature: -2.0,
      actualUsage: 1554551.0,
      predictedUsage: 922707.6139740222,
    },
    {
      temperature: -1.7,
      actualUsage: 584746.7,
      predictedUsage: 922591.0601908767,
    },
    {
      temperature: 20.0,
      actualUsage: 291335.7,
      predictedUsage: 1057935.4456368247,
    },
    {
      temperature: 10.9,
      actualUsage: 218827.9,
      predictedUsage: 966380.7258023678,
    },
    {
      temperature: 19.4,
      actualUsage: 228338.1,
      predictedUsage: 1050331.7481797987,
    },
    {
      temperature: 13.7,
      actualUsage: 985482.8,
      predictedUsage: 989149.0958283555,
    },
    {
      temperature: 20.0,
      actualUsage: 1814276.0,
      predictedUsage: 1057935.4456368247,
    },
    {
      temperature: 21.9,
      actualUsage: 350990.7,
      predictedUsage: 1083482.7949002588,
    },
    {
      temperature: 11.6,
      actualUsage: 1319838.0,
      predictedUsage: 971624.8468007843,
    },
    {
      temperature: 23.3,
      actualUsage: 2056764.0,
      predictedUsage: 1103739.1691997384,
    },
    {
      temperature: -1.6,
      actualUsage: 913342.0,
      predictedUsage: 922564.1000186789,
    },
    {
      temperature: 6.4,
      actualUsage: 1002428.0,
      predictedUsage: 939768.7661513566,
    },
    {
      temperature: 3.0,
      actualUsage: 206526.5,
      predictedUsage: 927770.5113819657,
    },
    {
      temperature: 13.1,
      actualUsage: 824215.7,
      predictedUsage: 983867.5430886924,
    },
    {
      temperature: 28.8,
      actualUsage: 1602049.0,
      predictedUsage: 1195140.8106282724,
    },
    {
      temperature: 0.9,
      actualUsage: 195293.2,
      predictedUsage: 923825.7885177194,
    },
    {
      temperature: 24.1,
      actualUsage: 480636.8,
      predictedUsage: 1115861.0665516863,
    },
    {
      temperature: 10.3,
      actualUsage: 215587.3,
      predictedUsage: 962122.9870544032,
    },
    {
      temperature: 16.0,
      actualUsage: 582767.5,
      predictedUsage: 1011435.5995978505,
    },
    {
      temperature: 14.3,
      actualUsage: 514298.2,
      predictedUsage: 994650.6978247697,
    },
    {
      temperature: 14.5,
      actualUsage: 2207165.0,
      predictedUsage: 996533.5052863794,
    },
    {
      temperature: 25.1,
      actualUsage: 607099.4,
      predictedUsage: 1131573.7285841212,
    },
    {
      temperature: 21.8,
      actualUsage: 450563.6,
      predictedUsage: 1082082.4534770087,
    },
    {
      temperature: 25.7,
      actualUsage: 386966.9,
      predictedUsage: 1141300.561778716,
    },
    {
      temperature: 26.7,
      actualUsage: 2157397.0,
      predictedUsage: 1158011.4253905886,
    },
    {
      temperature: 23.6,
      actualUsage: 174591.6,
      predictedUsage: 1108238.2303193687,
    },
    {
      temperature: 6.4,
      actualUsage: 317677.9,
      predictedUsage: 939768.7661513566,
    },
    {
      temperature: 18.1,
      actualUsage: 1194642.0,
      predictedUsage: 1034619.248410039,
    },
    {
      temperature: 28.4,
      actualUsage: 467181.0,
      predictedUsage: 1187855.4870506818,
    },
    {
      temperature: 9.7,
      actualUsage: 870663.8,
      predictedUsage: 958083.9764747012,
    },
    {
      temperature: 12.4,
      actualUsage: 761746.0,
      predictedUsage: 977983.5383454644,
    },
    {
      temperature: 8.9,
      actualUsage: 825563.8,
      predictedUsage: 953038.4699060158,
    },
    {
      temperature: 21.8,
      actualUsage: 136647.6,
      predictedUsage: 1082082.4534770087,
    },
    {
      temperature: 24.3,
      actualUsage: 1101180.0,
      predictedUsage: 1118953.7665902888,
    },
    {
      temperature: 27.2,
      actualUsage: 679883.7,
      predictedUsage: 1166601.2694029862,
    },
    {
      temperature: 9.7,
      actualUsage: 198728.5,
      predictedUsage: 958083.9764747012,
    },
    {
      temperature: 4.1,
      actualUsage: 1484411.0,
      predictedUsage: 930891.6321852517,
    },
    {
      temperature: 19.9,
      actualUsage: 1001938.0,
      predictedUsage: 1056652.7178319679,
    },
    {
      temperature: 5.2,
      actualUsage: 1028090.0,
      predictedUsage: 934739.8256016022,
    },
    {
      temperature: 3.8,
      actualUsage: 538214.0,
      predictedUsage: 929968.3714878267,
    },
    {
      temperature: 3.9,
      actualUsage: 1385913.0,
      predictedUsage: 930270.117987932,
    },
    {
      temperature: 3.4,
      actualUsage: 788039.9,
      predictedUsage: 928821.4309602869,
    },
    {
      temperature: 4.2,
      actualUsage: 593185.2,
      predictedUsage: 931211.4020411073,
    },
    {
      temperature: 29.8,
      actualUsage: 4655198.0,
      predictedUsage: 1213793.552651317,
    },
    {
      temperature: 27.2,
      actualUsage: 137893.8,
      predictedUsage: 1166601.2694029862,
    },
    {
      temperature: 16.6,
      actualUsage: 340133.3,
      predictedUsage: 1017782.8834657856,
    },
    {
      temperature: 3.6,
      actualUsage: 215278.8,
      predictedUsage: 929382.8942881218,
    },
    {
      temperature: 9.7,
      actualUsage: 658085.1,
      predictedUsage: 958083.9764747012,
    },
    {
      temperature: 26.8,
      actualUsage: 577043.9,
      predictedUsage: 1159716.8842937052,
    },
    {
      temperature: 6.4,
      actualUsage: 2212229.0,
      predictedUsage: 939768.7661513566,
    },
    {
      temperature: 2.8,
      actualUsage: 208123.8,
      predictedUsage: 927281.0378623488,
    },
    {
      temperature: 19.9,
      actualUsage: 365960.0,
      predictedUsage: 1056652.7178319679,
    },
    {
      temperature: 16.1,
      actualUsage: 396010.1,
      predictedUsage: 1012478.1306871457,
    },
    {
      temperature: 13.1,
      actualUsage: 697955.7,
      predictedUsage: 983867.5430886924,
    },
    {
      temperature: 7.5,
      actualUsage: 936816.1,
      predictedUsage: 945141.8444622762,
    },
    {
      temperature: 7.3,
      actualUsage: 2408573.0,
      predictedUsage: 944110.5531732647,
    },
    {
      temperature: 18.2,
      actualUsage: 1255862.0,
      predictedUsage: 1035790.9122007239,
    },
    {
      temperature: 6.8,
      actualUsage: 198728.5,
      predictedUsage: 941638.065612183,
    },
    {
      temperature: 7.9,
      actualUsage: 264005.1,
      predictedUsage: 947276.9824125434,
    },
    {
      temperature: 6.5,
      actualUsage: 3903823.0,
      predictedUsage: 940227.0377848427,
    },
    {
      temperature: 2.0,
      actualUsage: 823352.8,
      predictedUsage: 925562.8507743161,
    },
    {
      temperature: 8.9,
      actualUsage: 225748.1,
      predictedUsage: 953038.4699060158,
    },
    {
      temperature: 26.9,
      actualUsage: 1567229.0,
      predictedUsage: 1161428.5970671827,
    },
    {
      temperature: 16.8,
      actualUsage: 174119.2,
      predictedUsage: 1019947.7834795705,
    },
    {
      temperature: 28.9,
      actualUsage: 169951.3,
      predictedUsage: 1196977.827466303,
    },
    {
      temperature: 7.0,
      actualUsage: 549921.1,
      predictedUsage: 942608.9390626851,
    },
    {
      temperature: 11.7,
      actualUsage: 1675467.0,
      predictedUsage: 972398.3575633313,
    },
    {
      temperature: -4.7,
      actualUsage: 498645.8,
      predictedUsage: 926160.0265576384,
    },
    {
      temperature: 21.4,
      actualUsage: 952615.7,
      predictedUsage: 1076543.0760340788,
    },
    {
      temperature: 15.5,
      actualUsage: 1064879.0,
      predictedUsage: 1006314.9821209022,
    },
    {
      temperature: 6.1,
      actualUsage: 3921172.0,
      predictedUsage: 938430.149067292,
    },
    {
      temperature: 1.6,
      actualUsage: 355282.2,
      predictedUsage: 924847.4605406468,
    },
    {
      temperature: 12.4,
      actualUsage: 385916.8,
      predictedUsage: 977983.5383454644,
    },
    {
      temperature: 9.7,
      actualUsage: 560397.8,
      predictedUsage: 958083.9764747012,
    },
    {
      temperature: 14.5,
      actualUsage: 210376.6,
      predictedUsage: 996533.5052863794,
    },
    {
      temperature: 23.2,
      actualUsage: 1157334.0,
      predictedUsage: 1102251.9157872312,
    },
    {
      temperature: 16.5,
      actualUsage: 295342.1,
      predictedUsage: 1016709.6496680336,
    },
    {
      temperature: 14.8,
      actualUsage: 845460.8,
      predictedUsage: 999403.6275314916,
    },
    {
      temperature: 13.2,
      actualUsage: 133387.7,
      predictedUsage: 984732.5305740235,
    },
    {
      temperature: 0.6,
      actualUsage: 600204.5,
      predictedUsage: 923477.5655603796,
    },
    {
      temperature: 13.8,
      actualUsage: 242228.7,
      predictedUsage: 990050.742000002,
    },
    {
      temperature: 25.4,
      actualUsage: 133495.6,
      predictedUsage: 1136409.070761997,
    },
    {
      temperature: 20.7,
      actualUsage: 1149443.0,
      predictedUsage: 1067087.654056341,
    },
    {
      temperature: 4.8,
      actualUsage: 205594.3,
      predictedUsage: 933256.2677741847,
    },
    {
      temperature: 24.0,
      actualUsage: 552992.6,
      predictedUsage: 1114324.0541650995,
    },
    {
      temperature: 25.6,
      actualUsage: 418457.5,
      predictedUsage: 1139663.8242144038,
    },
    {
      temperature: 30.7,
      actualUsage: 294508.4,
      predictedUsage: 1231118.4640847554,
    },
    {
      temperature: 3.5,
      actualUsage: 1368202.0,
      predictedUsage: 929099.161429881,
    },
    {
      temperature: 4.7,
      actualUsage: 778942.6,
      predictedUsage: 932900.4220651705,
    },
    {
      temperature: 16.0,
      actualUsage: 251223.2,
      predictedUsage: 1011435.5995978505,
    },
    {
      temperature: 19.2,
      actualUsage: 684910.6,
      predictedUsage: 1047846.5858785985,
    },
    {
      temperature: 3.5,
      actualUsage: 1180704.0,
      predictedUsage: 929099.161429881,
    },
    {
      temperature: 14.9,
      actualUsage: 448314.9,
      predictedUsage: 1000372.5822111977,
    },
    {
      temperature: 3.3,
      actualUsage: 273748.8,
      predictedUsage: 928549.701800019,
    },
    {
      temperature: 4.8,
      actualUsage: 2772920.0,
      predictedUsage: 933256.2677741847,
    },
    {
      temperature: 15.7,
      actualUsage: 359226.7,
      predictedUsage: 1008344.8258350586,
    },
    {
      temperature: 3.2,
      actualUsage: 1077278.0,
      predictedUsage: 928283.9728697566,
    },
    {
      temperature: 6.9,
      actualUsage: 482607.3,
      predictedUsage: 942120.4827946594,
    },
    {
      temperature: 19.3,
      actualUsage: 7220513.0,
      predictedUsage: 1049086.080568543,
    },
    {
      temperature: 5.0,
      actualUsage: 1349963.0,
      predictedUsage: 933986.00953098,
    },
    {
      temperature: 10.2,
      actualUsage: 273667.3,
      predictedUsage: 961434.6354643607,
    },
    {
      temperature: 5.6,
      actualUsage: 281328.3,
      predictedUsage: 936319.7152225885,
    },
    {
      temperature: 16.0,
      actualUsage: 331190.3,
      predictedUsage: 1011435.5995978505,
    },
    {
      temperature: 1.8,
      actualUsage: 4687737.0,
      predictedUsage: 925193.1875770903,
    },
    {
      temperature: 19.9,
      actualUsage: 1168845.0,
      predictedUsage: 1056652.7178319679,
    },
    {
      temperature: 24.5,
      actualUsage: 777610.5,
      predictedUsage: 1122071.3741782685,
    },
  ];

  useEffect(() => {
    // Set up SVG and dimensions
    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };

    svg.attr("width", width).attr("height", height);

    // Scale functions
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(dataPoints, (d) => d.temperature))
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataPoints, (d) => Math.max(d.actualUsage, d.predictedUsage)),
      ])
      .nice()
      .range([height - margin.bottom, margin.top]);

    // Clear previous content
    svg.selectAll("*").remove();

    // Axes
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(6)
          .tickFormat((d) => `${d}°C`)
      )
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "black")
      .attr("text-anchor", "middle")
      .text("Temperature (°C)");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(6).tickFormat(d3.format(".2s")))
      .append("text")
      .attr("x", -margin.left)
      .attr("y", margin.top - 10)
      .attr("fill", "black")
      .attr("text-anchor", "start")
      .text("Electricity Usage (kWh)");

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("padding", "6px")
      .style("background", "#fff")
      .style("border", "1px solid #ddd")
      .style("border-radius", "4px")
      .style("visibility", "hidden")
      .style("pointer-events", "none");

    // Scatter plot points for actual usage
    svg
      .selectAll(".dot-actual")
      .data(dataPoints)
      .enter()
      .append("circle")
      .attr("class", "dot-actual")
      .attr("cx", (d) => xScale(d.temperature))
      .attr("cy", (d) => yScale(d.actualUsage))
      .attr("r", 5)
      .attr("fill", "steelblue")
      .attr("opacity", 0.7)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(
          `<strong>Temp:</strong> ${d.temperature}°C<br>
             <strong>Actual Usage:</strong> ${d.actualUsage.toFixed(2)} kWh`
        );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

    // Scatter plot points for predicted usage
    svg
      .selectAll(".dot-predicted")
      .data(dataPoints)
      .enter()
      .append("rect")
      .attr("class", "dot-predicted")
      .attr("x", (d) => xScale(d.temperature) - 4)
      .attr("y", (d) => yScale(d.predictedUsage) - 4)
      .attr("width", 8)
      .attr("height", 8)
      .attr("fill", "tomato")
      .attr("opacity", 0.7)
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible").html(
          `<strong>Temp:</strong> ${d.temperature}°C<br>
             <strong>Predicted Usage:</strong> ${d.predictedUsage.toFixed(
               2
             )} kWh`
        );
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", `${event.pageY - 10}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

    // Legend
    const legendData = [
      { label: "Actual Usage", color: "steelblue", shape: "circle" },
      { label: "Predicted Usage", color: "tomato", shape: "square" },
    ];

    svg
      .selectAll(".legend")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) =>
          `translate(${width - margin.right - 100},${margin.top + i * 20})`
      )
      .each(function (d) {
        d3.select(this)
          .append(d.shape === "circle" ? "circle" : "rect")
          .attr("r", 5)
          .attr("width", 8)
          .attr("height", 8)
          .attr("fill", d.color)
          .attr("opacity", 0.7);

        d3.select(this)
          .append("text")
          .attr("x", 20)
          .attr("y", 5)
          .attr("dy", "0.35em")
          .text(d.label)
          .style("font-size", "12px");
      });
  }, [dataPoints]);

  return (
    <div>
      <h2>Electricity Usage vs. Temperature (Scatter Plot)</h2>
      <svg ref={svgRef}></svg>
      <style>{`
        .tooltip {
          font-size: 12px;
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default ElectricityChart;
