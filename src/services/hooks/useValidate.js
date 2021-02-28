'use strict';

const useValidate = (validationModel, data) => {
	validationModel.set(data);

  return validationModel.isValid();
};

module.exports = {
	useValidate,
};

