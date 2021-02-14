const request = require('request');
require('dotenv').config();

const forecast = (latitude, longitude, callback) => {
  const url =
    `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STOCK_API_TOKEN}&query=` +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        'The temperature is ' +
          body.current.temperature +
          ' and the weather is ' +
          body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
