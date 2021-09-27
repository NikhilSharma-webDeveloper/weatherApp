const request = require('postman-request');

let forCast = ({ latitude, longitude, location }, callback) => {
    let url = "http://api.weatherstack.com/current?access_key=05d2ae300ce8745bdfb68977fb25f09c&query=" + latitude + "," + longitude + "\"";

    request({ url, json: true }, function (error, response) {
        if (error) {
            callback("Unable to connect to the weather servises", undefined)
        } else if (response.body.error) {
            callback("Invalid input, Please provide the correct data", undefined)
        } else {
            let responseData = "Today weather is " + response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degree C. There is " + response.body.current.precip + " % of rain.";
            callback(undefined, { responseData, location });
        }
    })

}
module.exports = forCast;