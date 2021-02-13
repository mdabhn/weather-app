const express = require('express');
const path = require('path');
const app = express();

const hbs = require('hbs');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));

app.use(express.static(path.join(__dirname, '../public')));

hbs.registerPartials(path.join(__dirname, '../templates/layouts'));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Home',
    msg: 'hello',
  });
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(3000, () => {
  console.log('running');
});
