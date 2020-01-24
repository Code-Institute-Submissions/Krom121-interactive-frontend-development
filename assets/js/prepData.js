// getTop function takes source data and sorts by the key
function getTop(int, data, sortByKey){
  // sort array
  let sortedData = data.sort(function(a,b){
    return (b[sortByKey] - a[sortByKey])
  })
  // slice the data by the parameter
  return sortedData.slice(0, int)
  
}

// convert to integers function
function convertToIntegers(array){
  return array.map(d => {
    d.GNI = parseInt(d.GNI);
    if(typeof d.GNI == 'number'){
      return d
    }else{ null }
  }).filter(d => d.GNI);
}

/*
  Loading the prepared data for use in charts.
*/
function prepData(srcString){
  return new Promise((resolve, reject) => {
    return d3.csv(srcString).then(result => {
      //console.log(result) check that dat is working
      let convertedIntegers = convertToIntegers(result);
      // filter the converted Integers by top 5 by the key of GNI
      let filteredRes = getTop(5, convertedIntegers, 'GNI')
      resolve(filteredRes);
      //console.log(filteredRes) check that dat is sorted
    })
  })
}