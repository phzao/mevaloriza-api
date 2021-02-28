const mongoose = require('mongoose');

const useSave = async (modelName, data) => {
  try {
    const ModelEntity = mongoose.model(modelName);
		const Entity = new ModelEntity(data);

	  const saved = await Entity.save();

		return [ 
			saved,
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
	useSave,
};
