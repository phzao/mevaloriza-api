'use strict';

const mongoose = require('mongoose');
const { STOCK_MODEL } = require('../models/constants');

const Stock = mongoose.model(STOCK_MODEL);

const save = async data => {
	const stock = new Stock(data);
                         
	return stock;
}

const getById = async id => {

}


module.exports = {
	save,
	getById,
};

