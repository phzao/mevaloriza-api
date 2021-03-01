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

const { UOL_API_URL, UOL_SOURCE } = require('../helpers');
const { STOCK_MODEL, ValidateStock } = require('../models');

const syncStockList = async (req, res, next) => {

  if (req.body.pass !== process.env.INTEGRATIONTOKEN)
    return resBadRequest(res, formatErrorMsg, 'Request not allowed');

  const urlList = `${UOL_API_URL}asset/list/?format=JSON&fields=abbreviation,id,name`;

  try {
    const result = await get(urlList);
    const { data } = result;
    const list = parseArr(data.docs).map(parseUolStock);

		const { modelEntity } = persistDb(STOCK_MODEL);
		const fnFind = mongoGet(modelEntity);
		const [ stocks, err ] = await useAsyncFn(fnFind);
		if (!result || err) 
			return resBadRequest(res, formatErrorMsg, SYNC_UOL_ERROR);

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
				const { fnSave } = persistDb(STOCK_MODEL);
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
