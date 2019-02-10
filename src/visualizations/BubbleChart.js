import React, { Component } from "react";
import * as d3 from "d3";

const width = 940;
const height = 600;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

class BubbleChart extends Component {
  state = {
    bubbles: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};

      const gitaExtent = d3.extent(data, d => d.gWeight)
      const bibleExtent = d3.extent(data, d => d.bWeight)
      const xScale = d3.scaleLinear()
        .domain([(0-bibleExtent[1]), gitaExtent[1]])
        .range([0, width])

      const maxSize = (Number(gitaExtent[1])+(Number(bibleExtent[1])))

      const size = d3.scaleLinear()
        .domain([0, maxSize])
        .range([0, height/6])

      console.log("data")
      console.log(data)

      const bubbles = Object.values(data).map(d => {

        return {
          x: xScale(Number(0-d.bWeight) + Number(d.gWeight)),
          y: height/2,
          size: size(Number(d.gWeight) + Number(d.bWeight)),
        }
      })
      console.log(bubbles)


    return {bubbles}
  }



  render() {


    return (
      <svg width={width} height={height}>
        {
          this.state.bubbles.map(d =>
            <circle cx={d.x} cy={d.y} r={d.size} fill="blue"/>
          )
        }
      </svg>
    );
  }
}

export default BubbleChart;
