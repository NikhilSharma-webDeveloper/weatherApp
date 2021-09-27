const request = require('postman-request');

let geoCode = (location, callback) => {
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(location) + ".json?access_token=pk.eyJ1IjoibmlraGlsMjMwNjIwMDAwIiwiYSI6ImNrdGhmYWt0YTA1eXAyd3BkbnZ2dmtpYzAifQ.GzKaXmC3oGZQ-59Zn_UzqQ";

    request({ url, json: true }, function (error, response) {
        if (error) {
            callback("Unable to connect to the weather servises", undefined)
        } else if (response.body.features.length === 0) {
            callback("Invalid input, Please provide the correct Location", undefined)
        } else {

            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geoCode;