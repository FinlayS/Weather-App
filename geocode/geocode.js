const request = require('request');

const mapQuestKey = 'eW7PgbMh9IY4YUaYD1N87tSmci0xsmu0';

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    request ({
        url: `https://www.mapquestapi.com/geocoding/v1/address?key=${mapQuestKey}&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to map server')

        } else if (body.info.statuscode===400){
            callback('Unable to find address');

        } else if (body.info.statuscode===0){
            callback(undefined, {
                address: (body.results[0].locations[0].adminArea5) + " " +
                (body.results[0].locations[0].postalCode),
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            })
        };
    }
)};

module.exports.geocodeAddress = geocodeAddress;
