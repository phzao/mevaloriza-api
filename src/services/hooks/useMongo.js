'use strict';

const mongoose = require('mongoose');

const byId = model => id => {
  if (!id || !Number(id)) {
    throw "Id must be a intger!";
  }

  console.log("typeid", typeof id)
  model.findById(id, (err, adventure) => {
    console.log("error", err);
    console.log("adventure", adventure);
  })
};

const byStatusAndId = (params, schema) => {

};

const all = model => (params = {}) => {

  return model.find(params);
}

const useMongo = modelName => {
  const modelEntity = mongoose.model(modelName);

  return {
    getById: byId(modelEntity),
    getAllBy: all(modelEntity),
  }
};

module.exports = {
  useMongo, 
};

