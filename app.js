// const yargs = require('yargs');
//
// const geocode = require('./geocode/geocode');
//
// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv;
//
// geocode.geocodeAddress(argv.address, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage)
//     } else {
//         console.log(JSON.stringify(results, undefined, 2));
//     }
//
// });


const request = require('request');

const darkSkyKey = 'e540d5f41e965f55d3c901f2f01b7725';

    request ({
            url: `https://api.forecast.io/forecast/${darkSkyKey}/51.994449,-0.221544`,
            json: true
        }, (error, response, body) => {

        if (!error && response.statusCode === 200) {
            console.log(JSON.stringify(body.currently.temperature))
        } else {
            console.log('Unable to fetch weather')
        }
    });