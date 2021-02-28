exports.mongoGet = model => async data => await model.find(data);

