import React, { Component } from "react";
import "./App.css";
import BarChart from "./visualizations/BarChart";
import RadialChart from "./visualizations/RadialChart";
import Chart from "./visualizations/Chart";
import bibleData from './data/bibleData.json'
import gitaData from './data/gitaData.json'

class App extends Component {
  state = {
    words: {},
    source: "bible", // city whose temperatures to show
    range: [], // time range set by the brush
    data: [],
  };



  // componentDidMount() {
  //   Promise.all([
  //     fetch(`${process.env.PUBLIC_URL || ""}/bibleData.json`),
  //     fetch(`${process.env.PUBLIC_URL || ""}/gitaData.json`)
  //   ])
  //     .then(responses => Promise.all(responses.map(resp => resp.json())))
  //     .then(([bible, gita]) => {
  //       createNodes = (bible, gita) => {
  //         var maxAmount = d3.max(bible, gita, function (d) { return d +d.frequency})
  //         var radiusScale = d3.scalePow()
  //           .exponet(0.5)
  //           .range([2, 85])
  //           .domain([0, maxAmount]);
  //
  //         var myNodes = [bible, gita].map(function (d) {
  //           return {
  //             id: d.id,
  //             radius: radiusScale(+d.frequency),
  //             value: +d.frequency,
  //             name: d.words,
  //             x: Math.random()*900,
  //             y: Math.random()* 800
  //           }
  //         });
  //         myNodes.sort(function (a, b) { return b.value - a.value });
  //         return myNodes
  //       };
  //       // bible.forEach(word => (word.weighted = new Number(word.weighted)));
  //       // gita.forEach(word => (word.weighted = new Number(word.weighted)));
  //
  //       this.setState({ words: { bible, gita } });
  //     });
  // }
  //
  // updateCity = e => {
  //   this.setState({ source: e.target.value });
  // };
  //
  // updateRange = range => {
  //   this.setState({ range });
  // };








  render() {

    // this.setState({
    // data: bibleData.map(item => {frequency: item.frequency, timeM: item.timeM})
    // })

    return(
      <div>
        stuff

        <ul>
          {
            bibleData.map((item, key) => {
              return <li key={key}>{item.word} {item.frequency}</li>
            })
          }
        </ul>

      </div>
    )
    // const data = this.state.words[this.state.source];
    //
    // return (
    //   <div className="App">
    //     <h1>
    //       2017 Temperatures for
    //       <select name="city" onChange={this.updateCity}>
    //         {[
    //           { label: "Bible", value: "bible" },
    //           { label: "Bhagivad Gita", value: "gita" }
    //           // {label: 'Amsterdam', value: 'am'},
    //         ].map(option => {
    //           return (
    //             <option key={option.value} value={option.value}>
    //               {option.label}
    //             </option>
    //           );
    //         })}
    //       </select>
    //     </h1>
    //
    //
    //
    //     <BarChart
    //       data={data}
    //       range={this.state.range}
    //       updateRange={this.updateRange}
    //     />
    //
    //   </div>
    // );
  }
}

export default App;
