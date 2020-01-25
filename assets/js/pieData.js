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
