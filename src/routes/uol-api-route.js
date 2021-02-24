 'use strict';

const express = require('express');
const { get } = require('axios');

const router = express.Router();

const {
	HTTP_OK,
	INTEGRATION_TYPE,
	HTTP_BAD_REQUEST,
	COMMUNICATION_API_ERROR,
} = require('../helpers');
const { parseArr, parseSplitPos } = require('../services');

const URL = 'https://api.cotacoes.uol.com/';


router.get('/uol-api', async (req, res, next) => {

  const urlList = `${URL}asset/list/?format=JSON&fields=abbreviation,id,name`;

	try {

		const data = await get(urlList);
		const res = parseArr(data.doc).map(stock => ({
			id: stock.id,
			abbr: parseSplitPos(stock.abbreviation, '.'),
			name: stock.name,
		}));

		return res.status(HTTP_OK).send(res); 
	} catch (e) {

		return res
			.status(HTTP_BAD_REQUEST)
			.send(parseErrorMsg(INTEGRATION_TYPE, COMMUNICATION_API_ERROR));
	}
});

module.exports = router;
 

