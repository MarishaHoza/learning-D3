import React, { Component } from "react"
import "./App.css"
import BubbleChart from "./visualizations/BubbleChart"
import newData from './data/rawData.json'
import * as d3 from "d3";


let startData = newData.filter(function(items) {
  return items.start == true;
})

let test = newData.filter(function(items) {
  return items.word === "god";
});


// this is for temporary data visualization
const StartData = props => (
  newData
    .filter((item, index, array) => {
        return item.start == true;
    })
    .map((item, key) => {
    return <li key={key}>{item.word} {item.bWeight} {item.gWeight}</li>
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
    console.log(test)
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
