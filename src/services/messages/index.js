'use strict';

const {
	HTTP_OK,
	HTTP_BAD_REQUEST,
	UOL_ERROR,
	HTTP_UNPROCESSABLE_ENTITY,
	HTTP_SAVED,
  HTTP_NOT_FOUND,
 } = require('../../helpers');

const formatSuccessMsg = content => ({
	status: 'success',
	data: content,
});

const formatFailMsg = content => ({
	status: 'fail',
	errors: [ content ],
});

const formatErrorMsg = content => ({
	status: 'error',
	message: content,
});

const resSaved = (content, res, fnFormat) =>
	res
		.status(HTTP_SAVED)
		.send(fnFormat(content));

const resOk = (content, res, fnFormat) => 
	res
		.status(HTTP_OK)
		.send(fnFormat(content));

const resUnprocessableEntity = (content, res, fnFormat) =>
	res
		.status(HTTP_UNPROCESSABLE_ENTITY)
		.send(fnFormat(content));
                              
const resIntegrationError = (res, fnFormat, content = UOL_ERROR) => 
	res
		.status(HTTP_BAD_REQUEST)
	  .send(fnFormat(content));

const resBadRequest = (res, fnFormat, message = 'Request unprocessed!') =>
	res
		.status(HTTP_BAD_REQUEST)
	  .send(fnFormat(message));

const resNotFound = (res, fnFormat, message) =>
  res
    .status(HTTP_NOT_FOUND)
    .send(fnFormat(message));

module.exports = {
	resOk,
	resUnprocessableEntity,
	resIntegrationError,
	resSaved,
	resBadRequest,
	formatErrorMsg,
	formatFailMsg,
	formatSuccessMsg,
  resNotFound,
};

