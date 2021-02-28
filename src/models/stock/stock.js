'use strict';

const mongoose = require('mongoose');
const { ENABLE_DISABLE, STOCK_MODEL, STATUS_ENABLE } = require('../constants');
const Schema = mongoose.Schema;

const schema = new Schema({
	name: {
		type: String,
    required: [true, "Name is required!"],
	},
	abbreviation: {
		type: String,
		required: [true, "Abbreviation is required!"],
	},
	source_id: {
		type: Number,
		required: [true, "Source ID is required!"],
	},
	source_api: {
		type: String,
		required: [true, "Source API is required!"],
	},
	status: {
		type: String,
		enum: ENABLE_DISABLE,
		default: STATUS_ENABLE,
		required: [true, "Status is required!"],
	},
},
{
	versionKey: false,
});

module.exports = {
	StockModel: mongoose.model(STOCK_MODEL, schema),
}
