const parse = require('./parse');
const messagesApi = require('./messages');
const hookData = require('./hooks');
const apiData = require('./api');
const databaseData = require('./database');

module.exports = {
	...parse,
	...messagesApi,
	...hookData,
	...apiData,
	...databaseData,
};
