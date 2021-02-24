'use strict';

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const { connect, set } = require('mongoose');
const { config } = require('dotenv');

const { connectionString } = require('./config');
const { routes, urlRoute, isProdEnv } = require('./routes');

config();

const app = express();

const isProd = isProdEnv(process.env.APP_ENV);

// connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true});
// set('useCreateIndex', true);

var corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

routes.map(routeItem => {
  app.use(urlRoute(isProd), function(...args) {
    return routeItem(...args);
  });
});

isProdEnv && app.listen(9000);

module.exports.handler = serverless(app);
