function enterMap(enterSelection){

    // append a path for globe
    enterSelection.append('path')
        .attrs({
            'd': d => pathGenerator({type: 'Sphere'}),
            'class': 'spherePath'
        });

    // append a path for each selection
    enterSelection.append('path')
        .attrs({
            'd': d => pathGenerator(d),
            'class': 'countryPath'
        });
}

function worldMap(srcData) {

    // select the svg element with d3
    let svgObj = d3.select('.worldWrapper')

    // make data join paths
    let dataJoin = svgObj.selectAll('path')
    // join the features to paths
    .data(srcData.features).join(enterMap)
}