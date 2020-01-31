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
            'class': 'countryPath',
            'fill': d => {
                return (d.gni !== null) ? colorScale(d.gni) : 'darkgrey'
            }
        }).append('title').text(d => `${d.countryName}: ${d.gni}`);
}

function worldMap(srcData) {

    let mappedGNIs = srcData.features.map(d => d.gni);
    mappedGNIs = mappedGNIs.filter(function(itm, pos) {
        return mappedGNIs.indexOf(itm) == pos;
    }).filter(d => d)

    colorScale.domain(mappedGNIs.reverse())

    // select the svg element with d3
    let svgObj = d3.select('.worldWrapper')

    // make data join paths
    let dataJoin = svgObj.selectAll('path')
    // join the features to paths
    .data(srcData.features).join(enterMap)
}