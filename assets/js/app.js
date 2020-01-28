/*
  Loading the data from the csv file.
*/

prepData("assets/data/countryGNI.csv").then(result => {
    return buildBarChart('#chartWrapper', result)
})

// import Data for pie chart

pieData("assets/data/countryClassifications.csv").then(result => {
  return buildPieChart('#pieWrapper', result)
})

// import data for Hierarchical tree chart

treeData("assets/data/treeData.csv", 'id', 'parent').then(result => {
  return buildTreeChart('#treeWrapper', result)
})


// import data for interactive bar & pie charts

let justStates = null,
rootData = null;

povertyData("assets/data/statePoverty.json").then(res => {
    // get just the states for the buttons
    let justStates = res.map(d => {
      return {State: d.State, checked: d.selected}
    })
    // return states data for buttons, result for chart data
    return {justStates, res}

}).then(({justStates, res}) => {
    //build the buttons
    buildButtons(justStates, 'buttonWrapper');

    rootData = res;

    //add button events
    let radios = d3.selectAll('.buttonG')
    radios.on('click', updateSelectedState)
    // get & show the currently selected data
})