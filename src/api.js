'use strict';

const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const { connect, set } = require('mongoose');
const { config } = require('dotenv');

const { connectionString } = require('./config');
const { routes, urlRoute, isDev } = require('./routes');

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
app.use(bodyParser.urlencoded({extended: false}));

routes.map(item => {
  app.use(urlRoute, function(...args) {
    return item(...args);
  });
});

isDev && app.listen(9000);

module.exports.handler = serverless(app);
