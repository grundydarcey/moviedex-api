/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const movieData = require('./moviedata.js');

const app = express();

app.use(morgan('dev'));

app.get('/movie', (req, res) => {
  res
    .json(movieData);
});

app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});