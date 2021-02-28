'use strict';
const mongoose = require('mongoose');

exports.persistDb = (modelName) => {
	const modelEntity = mongoose.model(modelName);

	const fnSave = async data => {
		const entity = new modelEntity(data);
		return await entity.save();
	}

	return {
		modelEntity,
		fnSave,
	};
}

