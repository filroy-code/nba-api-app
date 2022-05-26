import { useD3 } from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart(props) {

const [stats, updateStats] = React.useState(props.compare)

React.useEffect(() => {updateStats(props.compare)}, [props.compare])

  const ref = useD3(
    (svg) => {
      const yScale = d3
        .scaleBand()
        .domain(
          stats.map((dataPoint) => {
            return dataPoint.stat;
          })
        )
        .rangeRound([0, 750])
        .padding(0.1);

      const xScale = d3.scaleLinear().domain([-1, 1]).range([0, 500]);

      svg
        .classed("graph", true)
        .selectAll(".bar")
        .data(stats)
        .join("rect")
        .classed("bar", true)
        .attr("height", yScale.bandwidth())
        .transition()
        .duration(700)
        .attr("x", (data) => {
          if (data.comparison < 0) {
            return xScale(data.comparison / data.playerOne);
          } else {
            return 250;
          }
        })
        .attr("y", (data) => {
          return yScale(data.stat);
        })
        .attr("fill", (data) => {
          if (data.comparison < 0) {
            return "blue";
          } else {
            return "red";
          }
        })
        .transition()
        .duration(700)
        .attr("width", (data) => {
          if (data.comparison < 0) {
            // console.log(data.comparison / data.playerOne);
            return 250 - xScale(data.comparison / data.playerOne);
          } else {
            // console.log(data.comparison / data.playerTwo);
            return xScale(data.comparison / data.playerTwo) - 250;
          }
        });
        
        // const graphText = svg.append('g').attr('class', 'graphText');


      svg
        .selectAll("text")
        .data(stats)
        .join("text")
        .attr("x", (data) => {
          if (data.comparison < 0) {
            return -100;
          } else {
            return 550;
          }
        })
        .attr("y", (data) => {
          return yScale(data.stat) + 19;
        })
        .attr("font-weight", "bold")
        .text(
          (data) => `${data.stat} (+ ${Math.abs(data.comparison).toFixed(2)})`
        );
        // graphText
        // .selectAll("text")
        // .data(stats)
        // .enter()
        // .append("text")
        // .attr("x", (data) => {
        //     return -800;
        // })
        // .attr("y", (data) => {
        //   return yScale(data.stat) + 19;
        // })
        // .text(
        //   (data) => `${data.playerOne}`
        // );

    },
    [stats]
  );

  return (
    <svg
      className="graph"
      ref={ref}
      style={{
        paddingTop: "50px",
        marginRight: "0px",
        marginLeft: "0px",
        viewBox: "0 0 500 750",
        preserveAspectRatio: "xMinYMin meet"
      }}
    ></svg>
  );
}

export default BarChart;
