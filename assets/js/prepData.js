function convertToIntegers(array){
  return array.map(d => {
    d.GNI = parseInt(d.GNI);
    if(typeof d.GNI == 'number'){
      return d
    }else{ null }
  });
}

/*
  Loading the prepared data for use in charts.
*/
function prepData(srcString){
  return new Promise((resolve, reject) => {
    return d3.csv(srcString).then(result => {
      let convertedIntegers = convertToIntegers(result)
      return convertedIntegers;
    })
  })
}