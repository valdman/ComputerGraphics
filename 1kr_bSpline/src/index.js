import * as d3 from "d3";
import {generateBasisData, generateSplineData, Bxy} from "./mathStolen";

window.d3 = d3;

const width = 1000,
    height = 600,
    margin = 50;

const parabola = d3.range(-10, 10.5, 0.5).map(x => ({
    x,
    y: x * x
}))

const basisFunctionsData = generateBasisData();
const splineData = generateSplineData();
const data = basisFunctionsData.concat(splineData).concat(Bxy.map((v) => ({
    x: v[0],
    y: v[1]
})));

var x = d3.scaleLinear().domain(d3.extent(data.map(d => d.x))).range([0, width - margin]);
var y = d3.scaleLinear().domain(d3.extent(data.map(d => d.y))).range([height - margin, 0]);

//Create SVG-Canvas with 100px margins for axis
const canvas = d3.select("#app")
    .append("svg")
    .attr("width", width + 50)
    .attr("height", height + 50);

const svg = canvas.append("g")
    .attr("width", width-margin)
    .attr("height", height-margin)
    .attr("transform", `translate(${margin}, ${margin})`);

//Create X-Axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height-margin})`)
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
    .data(basisFunctionsData).enter()
    .append("circle")
    .attr("r", 0.8)
    .attr("cx", function (d) {return x(d.x*36-70)})
    .attr("cy", function (d) {return y(d.y*20)})
    .attr("fill", function (_, i) {return colors[Math.ceil(i / 600.0)]});

svg.append("g").selectAll("g.circles")
    .data(splineData).enter()
    .append("circle")
    .attr("r", 0.8)
    .attr("cx", function (d) {return x(d.x)})
    .attr("cy", function (d) {return y(d.y)})
    .attr("fill", "black");

svg.append("g").selectAll("g.circles")
    .data(Bxy).enter()
    .append("circle")
    .attr("r", 3)
    .attr("cx", function (d) {return x(d[0])})
    .attr("cy", function (d) {return y(d[1])})
    .attr("fill", "red");
