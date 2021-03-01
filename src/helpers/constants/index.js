const messages = require('./messages');
const system = require('./system');
const urls = require('./urls');

module.exports = {
	...messages,
	...system,
	...urls,
};
