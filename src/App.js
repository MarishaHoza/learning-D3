import React, { Component } from "react"
import "./App.css"
import Chart from "./visualizations/Chart"
import BubbleChart from "./visualizations/BubbleChart"
import bibleData from './data/bibleData.json'
import gitaData from './data/gitaData.json'
import * as d3 from "d3";


// filter data into useable form
const a = bibleData.map(function(items) {
  items.book = "bible";
  return items;
});
const b = gitaData.map(function(items) {
  items.book = "gita";
  return items;
});
const rawData = a.concat(b);
const startData = rawData.filter(function(items) {
  return items.start == true;
})


// map min and max weighted frequency values
const [min, max] = d3.extent(rawData, items => items.weighted);



// this is for temporary data visualization
const StartData = props => (
  rawData
    .filter((item, index, array) => {
        return item.start == true;
    })
    .map((item, key) => {
    return <li key={key}>{item.word} {item.frequency} {item.book}</li>
  })
)





class App extends Component {
  state = {
    words: {},
    book: "bible", // city whose temperatures to show
  };

componentDidMount() {
  this.setState({words: {startData}})
}

  render() {
    const data = this.state.words;

    console.log(startData)
    console.log([min,max])
    console.log(data)


    return(
      <div className="App">
        <BubbleChart data={data}/>

        <ul>
        <StartData/>
        </ul>

      </div>
    )
  }
}

export default App;
