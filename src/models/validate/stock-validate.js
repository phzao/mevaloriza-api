'use strict';

const ValidationContract = require("../../services/validators");
const { STATUS_ENABLE } = require('../../helpers');

let stock = {};

ValidateStock = () => {
	stock = {};
}

ValidateStock.prototype.set = body => {
	stock = {
		name: body.name || null,
		abbreviation: body.abbreviation || null,
		source_id: body.source_id || null,
		source_api: body.source_api || null,
		status: body.status || STATUS_ENABLE,
	};
}

ValidateStock.prototype.get = () => stock;

ValidateStock.prototype.isValid = body => {
	let contract = new ValidationContract();

	contract.hasMaxMinLen(body, 'abbreviation', 5, 6, 'Abbreviation is required and must be greater than 4 and less than 7 ');
	contract.isRequired(body, 'name', 'Name is required!');
	contract.isRequired(body, 'source_id', 'Source ID is required!');
	contract.isRequired(body, 'source_api', 'Source API is required!');
	contract.isValidEnum(body, 'status', ENABLE_DISABLE, `Status is required and must be ${JSON.stringify(ENABLE_DISABLE)}`);
}

module.exports = ValidateStock;

