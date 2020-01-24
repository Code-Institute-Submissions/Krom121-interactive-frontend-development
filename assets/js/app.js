/*
  Loading the data from the csv file.
*/

prepData("assets/data/countryGNI.csv").then(result => {
    return buildBarChart('#chartWrapper', result)
})
