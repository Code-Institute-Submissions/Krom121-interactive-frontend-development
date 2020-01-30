function lineChart(parentID, sourceData){
    let chartData = sourceData.bpi
    let xFormData = d => d.date
    let yFormData = d => d.value

    return new Promise((res, rej) => {
        // select the parent element
        const div = d3.select(parentID);
        // create margins for line chart
        const margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        };

	    //get width & height
	    const {width, height} = getWidthandHeight(div, margin)
            div.attrs({
            'width': width,
            'height': height
            })

        // append svg & g elements
        let svg = appendToParent(div, 'svg', 'svgWrapper', `translate(${margin.left},${margin.top})`)
            .attrs({
                height: height,
                width: width
            })
        // append svg & g elements
        let g = appendToParent(svg, 'g', 'gWrapper', `translate(${margin.left},${margin.top})`)
        
        //d3 scales
        xScale = d3.scaleTime()
            .domain(d3.extent(chartData, xFormData))
            .range([0, width - margin.right])

        yScale = d3.scaleLinear()
            .domain(d3.extent(chartData, yFormData))
            .range([height - margin.bottom - margin.top, margin.top]);

        //Axis elements
        let xAxis = appendToParent(g, 'g', 'xAxis', `translate(0, ${height - margin.bottom - margin.top})`)
            .call(d3.axisBottom(xScale));
        
        let yAxis = appendToParent(g, 'g', 'yAxis', null)
            .call(d3.axisLeft(yScale));

        res(sourceData);
    })
}