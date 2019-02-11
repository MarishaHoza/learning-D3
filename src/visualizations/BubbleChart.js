import React, { Component } from "react";
import * as d3 from "d3";

const width = 940;
const height = 600;

let center = {x: width / 2, y: height / 2};
let forceStrength = 0.03;



class BubbleChart extends Component {

  constructor(props) {
    super(props);

    const { data } = props;
    const gitaExtent = d3.extent(data, d => d.gWeight)
    const bibleExtent = d3.extent(data, d => d.bWeight)

    const xScale = d3.scaleLinear()
      .domain([(0-bibleExtent[1]), gitaExtent[1]])
      .range([0, width])

    const maxSize = (Number(gitaExtent[1])+(Number(bibleExtent[1])))

    const size = d3.scaleLinear()
      .domain([0, maxSize])
      .range([0, height/6])

    let bubbles = Object.values(data).map(d => {
      return {
        word: d.word,
        x: xScale(Number(0-d.bWeight) + Number(d.gWeight)),
        y: height/2,
        size: size(Number(d.gWeight) + Number(d.bWeight)),
      }
    })

    this.state = {
      bubbles: bubbles,
    };
  }


  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { data } = nextProps;
  //   if (!data) return {};
  //
  //     const gitaExtent = d3.extent(data, d => d.gWeight)
  //     const bibleExtent = d3.extent(data, d => d.bWeight)
  //     const xScale = d3.scaleLinear()
  //       .domain([(0-bibleExtent[1]), gitaExtent[1]])
  //       .range([0, width])
  //
  //     const maxSize = (Number(gitaExtent[1])+(Number(bibleExtent[1])))
  //
  //     const size = d3.scaleLinear()
  //       .domain([0, maxSize])
  //       .range([0, height/6])
  //
  //     let bubbles = Object.values(data).map(d => {
  //
  //       return {
  //         word: d.word,
  //         x: xScale(Number(0-d.bWeight) + Number(d.gWeight)),
  //         y: height/2,
  //         size: size(Number(d.gWeight) + Number(d.bWeight)),
  //       }
  //     })
  //     console.log("hello")
  //
  //   return {bubbles}
  // }

  

  componentDidMount(){

    let simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(charge))
      .on('tick', ticked);

    simulation.stop();

    function charge(d) {
      return -forceStrength * Math.pow(d.radius, 2.0);
    }

    function ticked() {
      this.state.bubbles
        .attr('cx', function (d) { return d.x; })
        .attr('cy', function (d) { return d.y; });
    }

    simulation.nodes(this.state.bubbles)
    console.log(this.state.bubbles)
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { data } = nextProps;
  //   if (!data) return {};
  //
  //     const gitaExtent = d3.extent(data, d => d.gWeight)
  //     const bibleExtent = d3.extent(data, d => d.bWeight)
  //     const xScale = d3.scaleLinear()
  //       .domain([(0-bibleExtent[1]), gitaExtent[1]])
  //       .range([0, width])
  //
  //     const maxSize = (Number(gitaExtent[1])+(Number(bibleExtent[1])))
  //
  //     const size = d3.scaleLinear()
  //       .domain([0, maxSize])
  //       .range([0, height/6])
  //
  //     let bubbles = Object.values(data).map(d => {
  //
  //       return {
  //         word: d.word,
  //         x: xScale(Number(0-d.bWeight) + Number(d.gWeight)),
  //         y: height/2,
  //         size: size(Number(d.gWeight) + Number(d.bWeight)),
  //       }
  //     })
  //     console.log("hello")
  //
  //   return {bubbles}
  // }


  render() {

    return (
      <svg width={width} height={height}>
        {
          this.state.bubbles.map(d =>
            <circle cx={d.x} cy={d.y} r={d.size} fill="rgb(116, 200, 192, 0.25)"/>
          )
        }
      </svg>
    );
  }
}

export default BubbleChart;
