// @TODO: YOUR CODE HERE!
// Set up SVG definitions
let svgWidth = 960;
let svgHeight = 620;

// set up borders in svg
let margin = {
  top: 20, 
  right: 40, 
  bottom: 200,
  left: 100
};

// calculate chart height and width
let width = svgWidth - margin.right - margin.left;
let height = svgHeight - margin.top - margin.bottom;

// append a div class to the scatter element
let chart = d3.select('#scatter')
  .append('div')
  .classed('chart', true);

//append an svg element to the chart 
let svg = chart.append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight);

//append an svg group
let chartGroup = svg.append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

//initial parameters; x and y axis
let chosenXAxis = 'poverty';
let chosenYAxis = 'healthcare';

//a function for updating the x-scale variable upon click of label
function xScale(censusData, chosenXAxis) {
    //scales
    let xLinearScale = d3.scaleLinear()
      .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
        d3.max(censusData, d => d[chosenXAxis]) * 1.2])
      .range([0, width]);

    return xLinearScale;
}
//a function for updating y-scale variable upon click of label
function yScale(censusData, chosenYAxis) {
  //scales
  let yLinearScale = d3.scaleLinear()
    .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
      d3.max(censusData, d => d[chosenYAxis]) * 1.2])
    .range([height, 0]);

  return yLinearScale;
}
//a function for updating the xAxis upon click
function renderXAxis(newXScale, xAxis) {
  let bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(2000)
    .call(bottomAxis);

  return xAxis;
}

//function used for updating yAxis variable upon click
function renderYAxis(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(2000)
    .call(leftAxis);

  return yAxis;
}

