import * as d3 from "d3";
import {generateBasisData, generateSplineData} from "./mathStolen";

window.d3 = d3;

const width = 1000,
    height = 600;

const parabola = d3.range(-10, 10.5, 0.5).map(x => ({
    x,
    y: x * x
}))

const basisFunctionsData = generateBasisData();
const splineData = generateSplineData();
const data = basisFunctionsData.concat(splineData);

var x = d3.scaleLinear().domain(d3.extent(data.map(d => d.x))).range([0, width]);
var y = d3.scaleLinear().domain(d3.extent(data.map(d => d.y))).range([height, 0]);

//Create SVG-Canvas with 100px margins for axis
const svg = d3.select("#app")
    .append("svg")
    .attr("width", width + 100)
    .attr("height", height + 100);

//Create X-Axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)); 

//Create Y-Axis
svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisRight(y)); 

const colors = [
    "#F5FFC5",
    "#E8B77F",
    "#FF30C0",
    "#3759E8",
    "#3DFF95",
    "#857DD1",
    "#B5E88B",
    "#BA690C"
]
    
svg.append("g").selectAll("g.circles")
    .data(data).enter()
    .append("circle")
    .attr("r", 0.8)
    .attr("cx", function (d) {return x(d.x)})
    .attr("cy", function (d) {return y(d.y)})
    .attr("fill", function (_, i) {return colors[Math.ceil(i / 600.0)]});
