'use strict';

const { parseColumnToText } = require('../parse');

let errors = {};

function ValidationContract() {
  errors = {};
}

const getNameText = field =>
	parseColumnToText(field, "_");

ValidationContract.prototype.isRequired = function(body, field) {
  if (!body[field] || !String(body[field]).length) {
		addErrorMsg(field, `${getNameText(field)} is required!`);
		return false;
  }
	return true;
};

ValidationContract.prototype.hasMinLen = function(body, field, min) {
  if(!this.isRequired(body, field)) return;

  if (body[field].length < min) {
    addErrorMsg(field, `${getNameText(field)} must be at least ${min} characters`);
  }
};

ValidationContract.prototype.hasMaxLen = function(body, field, max) {
  if(!this.isRequired(body, field)) return;
  if (body[field].length > max) {
    addErrorMsg(field, `${getNameText(field)} must be less than ${max}!`);
  }
};

ValidationContract.prototype.hasMaxMinLen = function(body, field, min, max) {
  if(!this.isRequired(body, field)) return;

  this.hasMinLen(body, field, min);
  this.hasMaxLen(body, field, max);
};

ValidationContract.prototype.hasExacLen = function(body, field, len) {
  if(!this.isRequired(body, field)) return;

  if (body[field].length !== len) {
    addErrorMsg(field, `${getNameText(field)} must be exacly ${len} characters!`);
  }
};

ValidationContract.prototype.isJson = function(body, field) {
  if(!this.isRequired(body, field)) return;

  if (typeof body[field] !== 'object') {
    addErrorMsg(field, `${getNameText(field)} must be a JSON type`);
  }
};

ValidationContract.prototype.errors = function() {
  return errors;
};

ValidationContract.prototype.clear = function() {
  errors = [];
};

ValidationContract.prototype.isValid = function() {
  return Boolean(!Object.keys(errors).length);
};

ValidationContract.prototype.isValidEnum = function(body, field, enumList) {
	if(!this.isRequired(body, field)) return

  if (typeof body[field] !== 'string') {
    addErrorMsg(field, `${getNameText(field)} must be a string!`);
	}

  if (!enumList.includes(body[field])) {
    addErrorMsg(
      field,
      `${getNameText(field)} must be which one of ${JSON.stringify(enumList)}`,
    );
  }
};

ValidationContract.prototype.isArrayGreaterThan = function(body, field, len) {
  if(!this.isRequired(body, field)) return;

  if (!body[field] || !Array.isArray(body[field]) || body[field].length < len) {
    addErrorMsg(field, `${getNameText(field)} must be less than ${len}!`);
  }
};

ValidationContract.prototype.isEmail = function(email) {
  var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(email)) {
    addErrorMsg('email', `E-mail invalid!`);
  }
};

const addErrorMsg = (field, message) => {
  errors[field]
    ? (errors[field] = [errors[field], message])
    : (errors[field] = message);
};

module.exports = ValidationContract;
