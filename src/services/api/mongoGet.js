'use strict';

const mongoGet = model => async data => await model.find(data);

module.exports = {
  mongoGet,
};

