const express = require('express');
const cors = require('cors');
const { default: helmet } = require('helmet');
const { NODE_ENV } = require('./constants/env.constant');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(['/', '/api'], (req, res) => {
  res.send(`Social Media API - ${NODE_ENV}`);
});

module.exports = { app };
