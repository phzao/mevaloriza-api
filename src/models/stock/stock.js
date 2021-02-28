'use strict';

const mongoose = require('mongoose');
const { ENABLE_DISABLE, STOCK_MODEL, STATUS_ENABLE } = require('../constants');
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
    },
    abbreviation: {
      type: String,
      required: [true, 'Abbreviation is required!'],
    },
    id: {
      type: Number,
      required: [true, 'ID is required!'],
    },
    source: {
      type: String,
      required: [true, 'Source is required!'],
    },
    status: {
      type: String,
      enum: ENABLE_DISABLE,
      default: STATUS_ENABLE,
      required: [true, 'Status is required!'],
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = {
  StockModel: mongoose.model(STOCK_MODEL, schema),
};
