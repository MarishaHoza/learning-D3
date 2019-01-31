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
  // 1. map date to x-position
  // get min and max of date
  let extent = d3.extent(data, d => d.date);
  let xScale = d3.scaleTime()
    .domain(extent)
    .range([0, width]);

  // 2. map high temp to y position
  // get min/max of high temp
  // const yExtent = d3.extent(data, d => d.high);
  let [min, max] = d3.extent(data, d => d.high);
  let yScale = d3.scaleLinear()
    //.domain(extent)
    .domain([Math.min(min,0), max])
    .range([height, 0]);

  // extra! map average temperature to color
  // get min/max of avg
  const colorExtent = d3.extent(data, d => d.avg).reverse()
  const colorScale = d3.scaleSequential()
    .domain(colorExtent)
    .interpolator(d3.interpolateRdYlBu)

  // array of objects: x, y, height
  return data.map(d => {
    return {
      x: xScale(d.date),
      y: yScale(d.high),
      height: yScale(d.low) - yScale(d.high),
      fill: colorScale(d.avg),
    }
  })
}
