'use strict';

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');

const { connect, set } = require('mongoose');
const { connectionString } = require('./config');

const { config } = require('dotenv');
const cors = require('cors');

config();

const app = express();

// connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true});
// set('useCreateIndex', true);

var corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};

const indexRoute = require('./routes/index-route');

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/.netlify/functions/api/phz', indexRoute);

app.listen(9000);

module.exports.handler = serverless(app);
