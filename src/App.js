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





class App extends Component {
  state = {
    words: {},
    book: "bible", // city whose temperatures to show
  };

componentDidMount() {
  Promise.all([
    fetch(`${process.env.PUBLIC_URL || ""}/rawData.json`)
  ])
  .then(responses => Promise.all(responses.map(resp => resp.json())))
  .then(([rawData]) => {

    this.setState({words: rawData
      .filter(function(items) {
      return items.start === true;
      })
    })
  })

}

  render() {
    const data = this.state.words;


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
