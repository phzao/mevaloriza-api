 const {
	HTTP_OK,
	INTEGRATION_TYPE,
	HTTP_BAD_REQUEST,
	UOL_ERROR,
} = require('../helpers');

const resOk = (content, res) => res && 
	res
		.status(HTTP_OK)
		.send(content);
                      
const resIntegrationError = res => res && 
	res
		.status(HTTP_BAD_REQUEST)
	  .send({
      type: INTEGRATION_TYPE,
			message: UOL_ERROR,
    });

module.exports = {
	resOk,
	resIntegrationError,
};
