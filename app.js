const request = require('request');
const yargs = require('yargs');

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
var mapQuestKey = 'eW7PgbMh9IY4YUaYD1N87tSmci0xsmu0';

request ({
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${encodedAddress}`,
    json: true
}, (error, response, body) => {
    console.log(`Body: ${JSON.stringify(body.results, undefined, 2)}`)

    var printedAddress =
        (body.results[0].locations[0].adminArea5) + ", " +
        (body.results[0].locations[0].postalCode);
    console.log(printedAddress)
    console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
});



