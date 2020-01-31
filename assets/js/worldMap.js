worldData().then(res => {
    console.log('finshed preparing data')
    console.log(res)
})

function worldData(){
    return new Promise((res, rej) => {

        // placeholder for data file
        let tsvData = null;

        // load country detail data
        d3.tsv('https://unpkg.com/world-atlas@1.1.4/world/50m.tsv')
            .then(tsvRes => {
                tsvData = tsvRes;

                // load atlas data
                d3.json('https://unpkg.com/world-atlas@1.1.4/world/50m.json')
                    .then(jsonRes => {

                        // define countries from json data
                        const countries = topojson.feature(jsonRes, jsonRes.objects.countries);

                        // connect counrty IDS to geography data
                        countries.features.forEach(d => {

                            // get this country id
                            let thisCountryID = d.id

                            // assign a countryName key to the countries feature
                            d.countryName = tsvData.filter(tsv => tsv.iso_n3 == [thisCountryID])[0].name

                            return d;
                        })

                        res(countries)

                    })
            })
    })
}