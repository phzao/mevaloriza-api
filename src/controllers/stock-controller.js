'use strict';

const { ValidateStock, STOCK_MODEL } = require('../models');
const { resSaved, resIntegrationError, resUnprocessableEntity, resBadRequest } = require('../services');
const { useSave } = require('../services/hooks/save');

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
		console.log("err", err);
		return resIntegrationError(res);
	}
}

module.exports = {
	stockPost,
};
