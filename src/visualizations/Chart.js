import React, { Component } from "react";
import * as d3 from "d3";

const width = 650;
const height = 400;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class Chart extends Component {
  state = {
    bars: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};
      // 1. map date to x-position
      // get min and max of date
      const extent = d3.extent(data, d => d.date);
      const xScale = d3.scaleTime()
        .domain(extent)
        .range([0, width]);

      // 2. map high temp to y position
      // get min/max of high temp
      // const yExtent = d3.extent(data, d => d.high);
      const [min, max] = d3.extent(data, d => d.high);
      const yScale = d3.scaleLinear()
        //.domain(extent)
        .domain([Math.min(min, 0), max])
        .range([height, 0]);

      // extra! map average temperature to color
      // get min/max of avg
      const colorExtent = d3.extent(data, d => d.avg).reverse()
      const colorScale = d3.scaleSequential()
        .domain(colorExtent)
        .interpolator(d3.interpolateRdYlBu)

      // array of objects: x, y, height
      const bars = data.map(d => {
        return {
          x: xScale(d.date),
          y: yScale(d.high),
          height: yScale(d.low) - yScale(d.high),
          fill: colorScale(d.avg),
        }
      })

    return {bars};
  }

  render() {
    return (
      <svg width={width} height={height}>;
        {
          this.state.bars.map(d =>
            <rect x={d.x} y={d.y} width={2} height={d.height} fill={d.fill}/>)
        }
      </svg>
    )
  }
}

export default Chart;
