'use strict';

const mongoose = require('mongoose');
const { ENABLE_DISABLE } = require('./constants');
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
});

module.exports = mongoose.model('Stock', schema);
