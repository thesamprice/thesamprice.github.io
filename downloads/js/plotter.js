
var plotter = {}
plotter.width = 500;
plotter.height = 500;
plotter.margin = {top: 10, right: 30, bottom: 30, left: 30};

plotter.figure = function(id)
{
    var margin = plotter.margin;
    plotter.figure = d3.select("id")
       .attr("width",  plotter.width + margin.left + margin.right)
       .attr("height", plotter.height + margin.top + margin.bottom)
       .append("g")
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
}

plotter.bar = function()
{
    if(arguments[0].length >= 2)
    {
        var data_x = arguments[0];
        var data_y = arguments[1];
    }
    else {
        var data_y = arguments[0];
    }

    plotter.x = d3.scaleLinear()
        .rangeRound([0, plotter.width])
        .domain(d3.extent(data_x, function(d) { return +d['# pos']; }));

    plotter.y = d3.scaleLinear()
     .domain([0, d3.max(data_y, function(d) { return +d['count']; })])
     .range([plotter.height, 0]);


    var bar = plotter.figure.selectAll(".bar")
     .data(data)
     .enter()
     .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return plotter.x(+d['# pos']) })
        .attr("y", function(d) { return plotter.y(+d['count']) })
        .attr("width", 3)
        .attr("height", function(d){ return  y(0) - y(+d['count'])  });
      /*
        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", 6)
            .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.length); });
      */
    plotter.figure.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + plotter.height + ")")
     .call(d3.axisBottom(plotter.x));
}
plotter.xlabel = function()
{
    
}
