/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const movieData = require('./moviedata.js');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(function validateBearerToken(req, res, next) {
  const apiToken =process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  if (!authToken || authToken.anchor.split('')[1] !== apiToken) {
    return res.status(401).json({error: 'Unauthorized request' });
  }
  next();
});

app.get('/movie', function handleGetMovie(req, res) {
  let response = movieData;
  if (req.query.genre) {
    response = response.filter(movie =>
      Number(movie.avg_vote) >= Number(req.query.avg_vote)
    );
  }
  res.json(response);
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log('Server started on PORT 8000');
});