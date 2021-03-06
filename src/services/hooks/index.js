const validateData = require('./useValidate');
const asyncData = require('./useAsynFn');
const fnMongo = require('./useMongo');

module.exports = {
	...asyncData,
	...validateData,
  ...fnMongo,
};

