const yargs = require('yargs');
const axios = require('axios');

const mapQuestKey = 'eW7PgbMh9IY4YUaYD1N87tSmci0xsmu0';

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = `https://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${encodedAddress}`

axios.get(geocodeUrl).then((response) => {
    if (response.data.info.statuscode === 400) {
        throw new Error('Unable to find address');
    }

    var darkSkyKey = 'e540d5f41e965f55d3c901f2f01b7725';
    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;

    var weatherUrl = `https://api.forecast.io/forecast/${darkSkyKey}/${lat},${lng}`;
    console.log(response.data.results[0].locations[0].adminArea5, lat, lng);
    return axios.get(weatherUrl)

    
}).then((response) => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. it feels like ${apparentTemperature}`)

}).catch((e) => {
    if (e.code === 'ECONNREFUSED') {
        console.log('Unable to connect to api server');
    } else if (e.code === 'ETIMEDOUT'){
        console.log("Request timed out");
    } else {
        console.log(e.message);
    }
});