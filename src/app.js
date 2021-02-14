const express = require('express');
const path = require('path');

const app = express();

const hbs = require('hbs');
require('dotenv').config();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

app.use(express.static(path.join(__dirname, '../public')));

hbs.registerPartials(path.join(__dirname, '../templates/layouts'));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
  });
});

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3000, () => {});
