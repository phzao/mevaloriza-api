const mongoose = require('mongoose');

const useFetch = async (modelName, params = {}) => {
  try {
    const ModelEntity = mongoose.model(modelName);
		const dataEntity = await ModelEntity.find(params);

		return [ 
			dataEntity,
			false,
		];
	} catch (err) {
		console.log(`${modelName} error save`, err);
		return [
			false,
		  err,
		]
	}
};

module.exports = {
	useFetch,
};
