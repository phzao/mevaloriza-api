const {URL_LOCAL, URL_NETLIFY} = require('../helpers');

const index = require('./index-route');
const stock = require('./stock-route');
const uol_api = require('./uol-api-route');

const urlRoute = env => 
  env ? URL_NETLIFY : URL_LOCAL;

module.exports = {
  routes: [index, stock, uol_api],
  urlRoute,
  isProdEnv: env => env === 'prod',
};
