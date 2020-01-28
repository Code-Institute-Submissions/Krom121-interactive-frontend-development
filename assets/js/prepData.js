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
  Loading the prepared data for use in barchart.
*/
function prepData(srcString){
  return new Promise((resolve, reject) => {
    return d3.csv(srcString).then(result => {
      //console.log(result) check that data is working
      let convertedIntegers = convertToIntegers(result);
      // filter the converted Integers by top 5 by the key of GNI
      let filteredRes = getTop(5, convertedIntegers, 'GNI')

      resolve(filteredRes);
      // console.log(filteredRes) check that dat is sorted
    })
  })
}


function getTop(int, data, sortByKey){
	//sort array
	let sortedData = data.sort(function(a, b){
		return (b[sortByKey] - a[sortByKey])
	})
	return sortedData.slice(0, int)
}

function convertToIntegers(array){
	return array.map(d => {
		d.GNI = parseInt(d.GNI);
		if(typeof d.GNI == 'number'){
			return d
		}else{ null }
	}).filter(d => d.GNI);
}

// grouping data for the pie chart 

function groupByLevel(srcData){
	let resArr = []
	
	srcData.forEach(d => {
		
		//check if this level is in array
		let isInArr = resArr.filter(ind => ind.level == d.IncomeGroup)[0]
		
		//if not in array, add to array with value of 1
		if(isInArr == undefined){
			let thisObj = {
				level: d.IncomeGroup,
				count: 1
			}
			resArr.push(thisObj)
		}

		//if in array, add to array value
		if(isInArr !== undefined){
			return resArr.map(obj => {
				if(obj.level == d.IncomeGroup){
					obj.count = obj.count + 1;
				}
				return obj
			})

		}
		
	})
	
	return resArr
}

/*
  Loading the prepared data for use in charts.
*/
function pieData(srcString){
	return new Promise((resolve, reject) => {

		return d3.csv(srcString).then(result => {

			let groupedData = groupByLevel(result)

			resolve(groupedData);
		})
	})
}

// Loading the prepared data for use in hierarchical chart

function treeData(srcString, idKey, parentKey){
	return new Promise((resolve, reject) => {

		return d3.csv(srcString).then(result => {

			// stratify data to give options for keys
			let stratData = d3.stratify()
		        .id(d => d[idKey])
		        .parentId(d => d[parentKey])
		        (result)
			// console.log('stratData') check that data is be loaded
			//console.log(stratData) check that data is be loaded
			 
			resolve(stratData);
		})
	})
}

function povertyData(fileName){
	return new Promise((res, rej) => {
		let resData = null;
		// load json data, assign to variable
		return d3.json(fileName).then(data => {
			// select first item
			let withSelection = data.map((d, ind) => {
				d['selected'] = (ind == 0) ? true : false
				return d
			})
			res(withSelection)
		})
	})
}