const saveData = require('./save');
const getData = require('./get');

module.exports = {
	...saveData,
	...getData,
};

