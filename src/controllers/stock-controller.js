'use strict';

const { ERROR_LIST, STATUS_DISABLE } = require('../helpers');
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
  //useMongo,
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
    return resIntegrationError(res, formatErrorMsg);
  }
};

const stockUpdate = async (req, res, next) => {
  const { modelEntity } = persistDb(STOCK_MODEL)
  const fnFind = mongoGet(modelEntity)
};

const stockDisableAll = async (req, res, next) => {
	const { fnSave, modelEntity } = persistDb(STOCK_MODEL);
	const fnFind = mongoGet(modelEntity);

  const [stocks, err] = await useAsyncFn(fnFind, { status: STATUS_DISABE });

	if (stocks) {
    const stocksDisabled = stocks.map(async (stock, k) => {

      stock.status = STATUS_DISABLE

      const [stockSaved, err] = await useAsyncFn(fnSave, stock);

      return err && err || stock
    })

		return resOk(stocksDisabled, res, formatSuccessMsg);
  }

	return resBadRequest(res, formatErrorMsg, err);
};

const stockGet = async (req, res, next) => {
  const { useMongo } = require('../services')
  console.log("usemong", useMongo());
  //console.log("getById", getById);
	//const { modelEntity } = persistDb(STOCK_MODEL);
	//const fnFind = mongoGet(modelEntity);

	//const [stocks, err] = await useAsyncFn(fnFind, req.body);

	//if (stocks)
		//return resOk(stocks, res, formatSuccessMsg);

	return resBadRequest(res, formatErrorMsg, ERROR_LIST);
}

module.exports = {
  stockPost,
	stockGet,
  stockDisableAll,
};

