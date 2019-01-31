// Create a bar chart with D3 scales
// 1. Use a time scale to map date to x-position
// 2. Use a linear scale to map high temperature to y-position
// 3. Calculate height as the difference between high and low temperatures
// 4. Return an array of objects, where each object has x, y, and height attributes
// that will be mapped to SVG rectangle elements and their attributes


data = d3.json('https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json')
  .then(resp => {
    return resp.map(d => Object.assign(d, {date: new Date(d.date)}));
  })

width = 650

height = 400



barChartData = {
  // 1
  var extent = d3.extent(data, d => d.date);
  var xScale = d3.scaleTime()
    .domain(extent)
    .range([0, width]);
  // 2
  const yExtent = d3.extent(data, d => d.high);
  var yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([height, 0]);

  // array of objects: x, y, height
  return data.map(d => {
    return {
      x: xScale(d.date),
      y: yScale(d.high),
      height: yScale(d.low) - yScale(d.high)
    }
  })
}
