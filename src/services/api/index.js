const dataGet = require('./get');
const mongoGet = require('./mongoGet');

module.exports = {
	...mongoGet,
	...dataGet,
};

