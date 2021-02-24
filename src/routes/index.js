const { URL_LOCAL, URL_NETLIFY } = require('../helpers');
const dotenv = require('dotenv')
dotenv.config();

const index = require('./index-route');
const stock = require('./stock-route');
const uol_api = require('./uol-api-route');

const isDev = process.env.APP_ENV === 'dev'; 
const urlRoute = isDev ? URL_LOCAL : URL_NETLIFY;

module.exports = {
  routes: [index, stock, uol_api],
  urlRoute,
  isDev,
};
