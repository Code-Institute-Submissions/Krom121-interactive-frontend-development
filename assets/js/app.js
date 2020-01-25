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
