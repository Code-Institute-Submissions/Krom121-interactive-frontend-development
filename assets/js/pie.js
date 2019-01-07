// pie chart to compare sales to shipping cost 
// defining the svg 
var width = 500, height= 500;
var colors = d3.scaleOrdinal(d3.schemePastel1);
var svg = d3.select("#sales_shipping").append("svg")
        .attr("width", width).attr("height", height);

    // data
var sales = [
    {"first quater": "sales", number: 124 },
    {"second quater": "sales", number: 197 },
    {"third quater": "sales", number: 144 },
    {"fourth quater": "sales", number: 108 },
    {"first shipping": "cost", number: 87},
    {"second shipping": "cost", number: 124},
    {"third shipping": "cost", number: 47},
    {"fourth shipping": "cost", number: 27},

];
   // creating the pie chart adding data

var data = d3.pie().sort(null).value(function(d){ return d.number })(sales);
        console.log(data);
        var segments = d3.arc()
                .innerRadius(0)
                .outerRadius(200)
                .padAngle(.05)
                .padRadius(50);

// creating sections of pie chart and paths plus colors

var sections = svg.append("g").attr("transform", "translate(250, 250)")
                .selectAll("path").data(data);
sections.enter().append("path").attr("d", segments).attr("fill",
function(d){ return colors(d.data.number); });

// creating legends

var legends = svg.append("g").attr("transform", "translate(500, 300)")
        .selectAll(".legends").data(data);
var legend = legends.enter().append("g").classed("legends", 
true).attr("transform", function(d,i){
        return "translate(0," + (i + 1)*30 + ")";});
legend.append("rect").attr("width", 20).attr("height", 20).attr("fill",
function(d){
        return colors(d.data.number);});
        