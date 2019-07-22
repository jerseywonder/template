
// import Ractive from 'ractive'
// import template from "../modules/template.html"
// import ractiveTap from 'ractive-events-tap'
import * as d3 from "d3";

export class Health {

	constructor(data) {

        var self = this

        var parseTime = d3.timeParse("%Y");

		data.forEach(function(d) {
			d.group = +d.year
			d.year = parseTime(d.year.toString());
			d["Deaths per 100,000"] = +d["Deaths per 100,000"];
		});

        this.database = data

        this.target = data.filter( (item) => item.group > 1979)

        this.init()

	}

	init() {

		var self = this

		d3.select("#graphicContainer svg").remove();

		var w = document.querySelector("#graphicContainer").getBoundingClientRect().width
		var h = w * 0.6;	

		var margin = {top: 20, right: 20, bottom: 30, left: 50},
		    width = w - margin.left - margin.right,
		    height = h - margin.top - margin.bottom;

		var x = d3.scaleTime().range([0, width]);
		var y = d3.scaleLinear().range([height, 0]);

		var xAxis = d3.axisBottom(x);
		var yAxis = d3.axisLeft(y);

		var valueline = d3.line()
		    .x(function(d) { return x(d.year); })
		    .y(function(d) { return y(d["Deaths per 100,000"]); });

		var svg = d3.select("#graphicContainer").append("svg")
		    .attr("width", width + margin.left + margin.right)
		    .attr("height", height + margin.top + margin.bottom)
		  .append("g")
		    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

		x.domain(d3.extent(self.database, function(d) { return d.year; }));
		y.domain([0, d3.max(self.database, function(d) { return d["Deaths per 100,000"]; })]);

		svg.append("path")
		  .data([self.database])
		  .attr("class", "line")
		  .attr("d", valueline);

		svg.append("g")
			.attr("class", "x axis")
		  	.attr("transform", "translate(0," + height + ")")
		  	.call(xAxis);

		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		var zoomed = true;

		function zoomOut() {

			x.domain(d3.extent(self.database, function(d) { return d.year; }));
			y.domain([0, d3.max(self.database, function(d) { return d["Deaths per 100,000"]; })]);

		    var boom = d3.select("#graphicContainer svg").transition();

	        boom.select(".line")
	            .duration(750)
	            .attr("d", valueline(self.database));
	        boom.select(".x.axis")
	            .duration(750)
	            .call(xAxis);
	        boom.select(".y.axis")
	            .duration(750)
	            .call(yAxis);

		}

		function zoomIn() {

	    	x.domain(d3.extent(self.target, function(d) { return d.year; }));
		    y.domain([0, d3.max(self.target, function(d) { return d["Deaths per 100,000"]; })]);

		    var boom = d3.select("#graphicContainer svg").transition();

	        boom.select(".line")
	            .duration(750)
	            .attr("d", valueline(self.target));
	        boom.select(".x.axis")
	            .duration(750)
	            .call(xAxis);
	        boom.select(".y.axis")
	            .duration(750)
	            .call(yAxis);

		}

		d3.select("#zoomButton").on("click", function() {
		    if (!zoomed) {
		        zoomIn();
		        zoomed = true;
		        d3.select("#zoomButton").text("zoom out");
		    } else {
		        zoomOut();
		        zoomed = false;
		        d3.select("#zoomButton").text("zoom in");
		    }
		})

	}

}