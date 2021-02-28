'use strict';

const ValidationContract = require("../../services/validators");
const { STATUS_ENABLE } = require('../../helpers');
const { ENABLE_DISABLE } = require('../constants');

let stock = {};

function ValidateStock() {
	stock = {};
}

ValidateStock.prototype.set = function(body) {
	stock = {
		name: body.name || null,
		abbreviation: body.abbreviation || null,
		id: body.source_id || null,
		source: body.source_api || null,
		status: body.status || STATUS_ENABLE,
	};
}

ValidateStock.prototype.get = function() { return stock };

ValidateStock.prototype.isValid = function() {
	let contract = new ValidationContract();

	contract.hasMaxMinLen(stock, 'abbreviation', 5, 6);
	contract.isRequired(stock, 'name');
	contract.isRequired(stock, 'id');
	contract.isRequired(stock, 'source');
	contract.isValidEnum(stock, 'status', ENABLE_DISABLE);

	return [
		this.get(),
		contract.isValid(),
		contract.errors(),
	];
}

module.exports = {
	ValidateStock,
}

