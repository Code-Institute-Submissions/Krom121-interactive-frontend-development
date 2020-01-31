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

// import data for line chart

lineData('https://api.coindesk.com/v1/bpi/historical/close.json')
    .then(resData => {
       lineChart('#lineWrapper', resData).then(handleLineUpdate)
    })