const validateData = require('./useValidate');
const asyncData = require('./useAsynFn');

module.exports = {
	...asyncData,
	...validateData,
};

