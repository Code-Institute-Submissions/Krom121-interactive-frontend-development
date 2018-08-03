queue()
    .defer(d3.csv, "../data/sales-products-2012-14.csv")
    .await(graphs);

function graphs(error, salesData){
    var ndx = crossfilter(salesData);

    show_sales_by_counrty(ndx);

    dc.renderAll();

}

function show_sales_by_counrty(ndx){
    var dim = ndx.dimension(dc.pluck('country'));
    var group = dim.group();

    dc.barChart("#by-country")
        .width(400)
        .height(400)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(dim)
        .group(group)
        .transitionDuration(500)
        .x(d3.scale.ordinal)
        .xUnits(dc.units.ordinal)
        .xAxisLabel("Country")
        .yAxis().ticks(5);
}