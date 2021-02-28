const { URL_LOCAL, URL_NETLIFY } = require('../helpers');

const index = require('./index-route');
const stock = require('./stock-route');
const uol_api = require('./uol-api-route');

module.exports = env => [
	[index, stock, uol_api],
  env ? URL_NETLIFY : URL_LOCAL,
	env === 'prod',
];
