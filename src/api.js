'use strict';

const serverless = require('serverless-http');
const { json, urlencoded } = require('body-parser');
const express = require('express');
const cors = require('cors');

const { connect, set } = require('mongoose');
const { config } = require('dotenv');

const [routesList, urlToRoute, isProdEnv] = require('./routes')(process.env.APP_ENV);

config();

const app = express();

connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true});
set('useCreateIndex', true);

var corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(json());
app.use(urlencoded({extended: false}));

routesList.map(routeItem => {
	app.use(urlToRoute, function(...args) {
		return routeItem(...args);
	});
});

!isProdEnv && app.listen(9000);

module.exports.handler = serverless(app);
