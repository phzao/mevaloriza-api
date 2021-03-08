const validateData = require('./useValidate');
const asyncData = require('./useAsynFn');
const fnMongo = require('./useMongo');
const errorsApi = require('./useErrorApi');

module.exports = {
	...asyncData,
	...validateData,
  ...fnMongo,
  ...errorsApi,
};

