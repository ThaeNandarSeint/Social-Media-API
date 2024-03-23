const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const { NODE_ENV } = require('./constants/env.constant');
const { ApiError } = require('./utils/error_handler.util');
const { errorHandler } = require('./middlewares/error_handler.middleware');
const { loadContainer } = require('./loaders/container.loader');

loadContainer();
const router = require('./routes/index');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/api'], (req, res) => {
  res.send(`Social Media API - ${NODE_ENV}`);
});

app.use('/api', router);

app.all('*', (req, res, next) => {
  next(ApiError.notFound());
});

app.use(errorHandler);

module.exports = { app };
