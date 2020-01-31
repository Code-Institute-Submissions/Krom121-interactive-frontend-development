
const geoNatural = d3.geoNaturalEarth1();

const pathGenerator = d3.geoPath().projection(geoNatural);

worldData().then(resultCountries => {
    worldMap(resultCountries)
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

                    // load GNI data
                    d3.csv('assets/data/countryClassifications.csv').then(gniData => {
                    // define countries from json data
                    const countries = topojson.feature(jsonRes, jsonRes.objects.countries);

                    // connect counrty IDS to geography data
                    countries.features.forEach(d => {

                    // get this country id
                    let thisCountryID = d.id

                    // assign a countryName key to the countries feature
                    d.countryName = tsvData.filter(tsv => tsv.iso_n3 == [thisCountryID])[0].name
                            
                    // assign a gni value from gni data
                    let thisClassification = gniData.filter(gni => gni.countryName == d.countryName)
                    d.gni = (thisClassification) ? thisClassification.Classification : null;

                        return d;
                    })

                    res(countries)
                })

            })
        })
    })
}