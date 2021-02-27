'use strict';

let errors = {};

ValidationContract = () => {
  errors = {};
}

ValidationContract.prototype.isRequired = (body, field, message) => {
  if (!body[field] || !body[field].length) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.hasMaxMinLen = (body, field, min, max, message) => {
  if (!body[field] || body[field].length < min) {
		addErrorMsg(field, message);
  }

  if (!body[field] || body[field].length > max) {
		addErrorMsg(field, message);
  }
}

ValidationContract.prototype.hasMinLen = (body, field, min, message) => {
  if (!body[field] || body[field].length < min) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.hasExacLen = (body, field, len, message) => {
  if (!body[field] || body[field].length !== len) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.hasMaxLenOrNull = (body, field, len, message) => {
  if (body[field] === null || body[field] === undefined) {
		addErrorMsg(field, message);
  }

  if (body[field].length > len) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.hasMaxLen = (body, field, max, message) => {
  if (!body[field] || body[field].length > max) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.isNumber = (
  body,
  field,
  message,
  decimals = 2,
) => {
  if (!body[field] || isNaN(+body[field])) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.isFixedLen = (body, field, len, message) => {
  if (!body[field] || body[field].length !== Number(len)) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.isJson = (body, field, message) => {
  if (typeof body[field] != 'object') {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.errors = () => {
  return errors;
};

ValidationContract.prototype.clear = () => {
  errors = [];
};

ValidationContract.prototype.isValid = () => {
  return Boolean(!errors.length);
};

ValidationContract.prototype.isValidEnum = (body, field, enum, message) => {
	if (!body[field] || !typeof body[field] !== 'String') {
		addErrorMsg(field, message);
	}
	if (!enum.includes(body[field])) {
		addErrorMsg(field, message);
	}
}

ValidationContract.prototype.isArrayGreaterThan = (
  body,
  field,
  len,
  message,
) => {
  if (!body[field] || !Array.isArray(body[field]) || body[field].length < len) {
		addErrorMsg(field, message);
  }
};

ValidationContract.prototype.isEmail = (value, message) => {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value)) {
		addErrorMsg(field, message);
  }
};

const addErrorMsg = (field, message) =>
	error[field]
		? error[field] = [...error[field], ...message]
		: error[field] = message;

module.exports = ValidationContract;
