'use strict';

const { ValidateStock, STOCK_MODEL } = require('../models');
const {
  resSaved,
	resOk,
  resIntegrationError,
  resUnprocessableEntity,
  resBadRequest,
	persistDb,
	mongoGet,
	useValidate,
	useAsyncFn,
	formatSuccessMsg,
	formatErrorMsg,
	formatFailMsg,
} = require('../services');
                                                    
const stockPost = async (req, res, next) => {

  if (req.body.pass !== process.env.INTEGRATIONTOKEN)
    return resBadRequest(res, formatErrorMsg, 'Request not allowed');
	
  try {
    const [stock, isValid, errors] = useValidate(new ValidateStock(), req.body);

		if (!isValid)
			return resUnprocessableEntity(errors, res, formatFailMsg);

		const { fnSave } = persistDb(STOCK_MODEL);

		const [stockSaved, err] = await useAsyncFn(fnSave, stock);

		if (!stockSaved)
			return resBadRequest(res, formatErrorMsg, err);

    return resSaved(stockSaved, res, formatSuccessMsg);
  } catch (err) {
    console.log('err', err);
    return resIntegrationError(res, formatErrorMsg);
  }
};

const stockGet = async (req, res, next) => {
	const { modelEntity } = persistDb(STOCK_MODEL);
	const fnFind = mongoGet(modelEntity);

	const [ stocks, err ] = await useAsyncFn(fnFind, req.body);

	if (stocks)
		return resOk(stocks, res, formatSuccessMsg);

	return resBadRequest(res, formatErrorMsg, 'Error when trying find stock');
}

module.exports = {
  stockPost,
	stockGet,
};

