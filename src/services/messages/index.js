 const {
	HTTP_OK,
	INTEGRATION_TYPE,
	HTTP_BAD_REQUEST,
	UOL_ERROR,
	HTTP_UNPROCESSABLE_ENTITY,
	HTTP_SAVED,
 } = require('../../helpers');

const resSaved = (content, res) =>
	res
		.status(HTTP_SAVED)
		.send({
			status: 'ok',
			data: content,
		})

const resOk = (content, res) => 
	res
		.status(HTTP_OK)
		.send(content);

const resUnprocessableEntity = (content, res) =>
	res
		.status(HTTP_UNPROCESSABLE_ENTITY)
		.send({
			type: 'invalid form',
			errors: [ content ],
		});
                      
const resIntegrationError = res => 
	res
		.status(HTTP_BAD_REQUEST)
	  .send({
      type: INTEGRATION_TYPE,
			message: UOL_ERROR,
    });

const resBadRequest = (res, message) =>
	res
		.status(HTTP_BAD_REQUEST)
	  .send({
      type: 'error',
			message: message || 'Request not processed!',
    });

module.exports = {
	resOk,
	resUnprocessableEntity,
	resIntegrationError,
	resSaved,
	resBadRequest,
};
