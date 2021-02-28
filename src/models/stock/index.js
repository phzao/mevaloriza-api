const model = require('./stock');
const validation = require('./stock-validate');

module.exports = {
	...model,
	...validation,
};

