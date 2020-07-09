const request = require('request');
const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiamFja2FzczIxIiwiYSI6ImNrY2J5YnFycTF0ZWUzM254a3hrMWFxNDMifQ.jECE-F0T12vAjzUEuSBHYg'

    request({
            url: url,
            json: true
    }, (error, response) => {

            if (error) {
                    callback('Unable to connect to local services', 'No data ');
            } else if (response.body.features.length === 0) {

                    callback('Unable to find location.Try another one', 'No data')
            } else {
                    const lat = response.body.features[0].center[1];
                    const lon = response.body.features[0].center[0];
                    const location = response.body.features[0].place_name
                    const data = {
                            lat,
                            lon,
                            location
                    }
                    callback('No error', data)
            }
    })
}

module.exports =  geocode
