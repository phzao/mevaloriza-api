'use strict';

const { get } = require('axios');

const {
  parseArr,
  resOk,
  resIntegrationError,
	resBadRequest,
  formatSuccessMsg,
  formatErrorMsg,
	parseUolStock,
	persistDb,
	mongoGet,
	useAsyncFn,
	useValidate,
} = require('../services');

const { UOL_SOURCE, UOL_STOCK_LIST, NOT_ALLOWED } = require('../helpers');
const { STOCK_MODEL, ValidateStock } = require('../models');

const syncStockList = async (req, res, next) => {

  if (req.body.pass !== process.env.INTEGRATIONTOKEN)
    return resBadRequest(res, formatErrorMsg, NOT_ALLOWED); 

  try {
    const result = await get(UOL_STOCK_LIST);

    const list = parseArr(result.data.docs).map(parseUolStock);

		const { modelEntity, fnSave } = persistDb(STOCK_MODEL);
		const fnFind = mongoGet(modelEntity);
		const [ stocks, err ] = await useAsyncFn(fnFind);

		if (!result || err) 
			return resBadRequest(res, formatErrorMsg,YNC_UOL_ERROR);

		const unSavedList = list
			.filter(item =>
				!stocks.find(stockLocal => 
					stockLocal.id === item.id &&
					stockLocal.source === UOL_SOURCE
				)
			).map(async newStock => {
				const myStock = {
					...newStock,
					source: UOL_SOURCE,
				}

				const [stock, isValid, errModel] = useValidate(new ValidateStock(), myStock);

				if (!isValid) return errModel;

				const [stockSaved, err] = await useAsyncFn(fnSave, stock);

				if (stockSaved) return stockSaved;

				return err;
			});
		  
		return Promise
			.all(unSavedList)
			.then(result => resOk(result, res, formatSuccessMsg));

  } catch (e) {
    return resIntegrationError(res, formatErrorMsg);
  } 
};

module.exports = {
	syncStockList,
};

