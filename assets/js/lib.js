function getWidthandHeight(obj, m){
	let width = +obj.attr("width") - m.left - m.right;
	let height = +obj.attr("height") - m.top - m.bottom;
	return { width, height }
}

function appendToParent(parent, type, className, transformation){
    return parent.append(type)
        .attrs({
            "class": className, 
            "transform": transformation
        });
      
}

function handleLineUpdate(data) {
    let lineObj = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d.value))
        .curve(d3.curveBasis)

    d3.select('.gWrapper')
        .append('path')
        .attrs({
            'fill': 'none',
            'stroke': 'red',
            'stroke-width': 4,
            'class': 'path',
            'd': lineObj(data.bpi)
        })
}