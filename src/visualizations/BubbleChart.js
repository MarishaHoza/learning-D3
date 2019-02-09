import React, { Component } from "react";
import * as d3 from "d3";
import bibleData from '../data/bibleData.json'
import gitaData from '../data/gitaData.json'


const width = 940;
const height = 600;
const margin = { top: 20, right: 5, bottom: 20, left: 35 };

// const StartDataB = props => (
//   bibleData.filter((item, index, array) => {
//     return item.start == true;
//   })
// )
// const StartDataG = props => (
//   gitaData.filter((item, index, array) => {
//     return item.start == true;
//   })
// )
//


class BubbleChart extends Component {
  state = {
    bubbles: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { data } = nextProps;
    if (!data) return {};



    // map min and max weighted frequency values
    const [min, max] = d3.extent(data, items => items.weighted);

  }



  render() {
    return (
      <div>
        // <svg ref={node => this.node = node} width={width} height={height}>
        // </svg>
      </div>
    );
  }
}

export default BubbleChart;
