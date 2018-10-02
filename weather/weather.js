const request = require('request');

const darkSkyKey = 'e540d5f41e965f55d3c901f2f01b7725';


var getWeather = (lat, lng, callback) =>{

    request ({
        url: `https://api.forecast.io/forecast/${darkSkyKey}/${lat},${lng}`,
        json: true
    }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather')
        }
    });
};

module.exports.getweather = getWeather;