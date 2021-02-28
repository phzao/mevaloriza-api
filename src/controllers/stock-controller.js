'use strict';

const { ValidateStock, STOCK_MODEL } = require('../models');
const {
  resSaved,
	resOk,
  resIntegrationError,
  resUnprocessableEntity,
  resBadRequest,
	useSave,
	useFetch,
} = require('../services');

const stockPost = async (req, res, next) => {
  let validationStock = new ValidateStock();

  try {
    validationStock.set(req.body);
    const [stock, isValid, errors] = validationStock.isValid();

    if (!isValid) return resUnprocessableEntity(errors, res);

    const [stockSaved, err] = await useSave(STOCK_MODEL, stock);

    if (!stockSaved) return resBadRequest(res, err);

    return resSaved(stockSaved, res);
  } catch (err) {
    console.log('err', err);
    return resIntegrationError(res);
  }
};

const stockGet = async (req, res, next) => {
	const [ stocks, err ] = await useFetch(STOCK_MODEL);

	if (!err) return resOk(stocks, res);

	return resBadRequest(res, 'Error when try find stock');
}

module.exports = {
  stockPost,
	stockGet,
};
