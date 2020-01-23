function prepData(srcString){
  return new Promise((resolve, reject) => {

    return d3.csv(srcString).then(result => {
      console.log(result)
    })
  })
}