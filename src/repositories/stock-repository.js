'use strict';

const mongoose = require('mongoose');

const { HTTP_NOT_FOUND, formatHttpException } = require('../helpers');
const { STOCK_MODEL } = require('../models/constants');

const Stock = mongoose.model(STOCK_MODEL);

const save = data => {
	const stock = new Stock(data);
                         
	return stock;
}

const getById = id => {
  if (!id || Number(id)) {
    throw formatHttpException(HTTP_NOT_FOUND, `${id} not found!`);
  }

  return Stock.findById(id);
}

module.exports = () => ({
	save,
	getById,
});

