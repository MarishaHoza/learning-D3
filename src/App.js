import React, { Component } from "react"
import "./App.css"
import BubbleChart from "./visualizations/BubbleChart"
import newData from './data/newData.json'



// let startData = newData.filter(function(items) {
//   return items.start == true;
// })
//
// let test = newData.filter(function(items) {
//   return items.word === "god";
// });


// this is for temporary data visualization
const StartData = props => (
  newData
    .filter((item, index, array) => {
        return item.start === true;
    })
    .map((item, key) => {
    return <li key={key}>{item.word} {item.bWeight} {item.gWeight}</li>
  })
)

const myData = newData.filter((item, index, array) => {
      return item.start === true;
})





class App extends Component {
  state = {
    words: myData,
    book: "bible", // city whose temperatures to show
  };

  render() {

    return(
      <div className="App">
        <BubbleChart data={this.state.words}/>

        <ul>
        <StartData/>
        </ul>

      </div>
    )
  }
}

export default App;
