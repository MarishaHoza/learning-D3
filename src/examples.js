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




// Create a line chart with D3 line
// Use a time scale to map date to x-position
// Use a linear scale to map temperature to y-position
// Use a line generator to generate a string for the d attribute of a path
// Return an array of two objects, one for the high temp path and the other for low temp path


lineChartData = {
  let xExtent = d3.extent(data, d => d.date);
  let xScale = d3.scaleTime()
    .domain(xExtent)
    .range([0, width])

  const highMax = d3.max(data, d => d.high)
  const lowMin = d3.min(data, d => d.low)

  let yScale = d3.scaleLinear()
    .domain([lowMin, highMax])
    .range([height, 0])

  var line = d3.line().x(d => xScale(d.date))
  // can do 2 line generators with both .x and .y
  // or use same var and call with .y in return (below)


  return [
    {path: line.y(d => yScale(d.high))(data), fill: 'red'},
    {path: line.y(d => yScale(d.low))(data), fill: 'blue'},
  ]
}





// Create a radial chart with D3 arc
// Use a linear scale to map temperature to radius
// Use an arc generator to generate a string for the d attribute of a path, where:
// startAngle: date
// endAngle: date + 1
// innerRadius: low temp
// outerRadius: high temp
// Return an array of objects, where each object has the d attribute to draw a path in the shape of a slice

radialChartData = {
  let radiusScale = d3.scaleLinear()
    .domain([
      d3.min(data, d => d.low),
      d3.max(data, d => d.high),
      ])
    .range([0, width/2]);

  let colorScale = d3.scaleSequential()
    .domain(d3.extent(data, d => d.avg).reverse())
    .interpolator(d3.interpolateRdYlBu)

  // get the angle for each slice
  // 2pi / 365
  let perSliceAngle = (2 * Math.PI) / data.length;

  let arcGenerator = d3.arc();

  return data.map((d, i) => {
    let path = arcGenerator({
      startAngle: i * perSliceAngle,
      endAngle: (i+1) * perSliceAngle,
      innerRadius: radiusScale(d.low),
      outerRadius: radiusScale(d.high),
    });
    return {path, fill: colorScale(d.avg)}
  })
}
