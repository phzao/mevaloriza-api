 'use strict';

const express = require('express');
const { get } = require('axios');

const router = express.Router();

const { parseArr, parseSplitPos, resOk, resIntegrationError } = require('../services');

const URL = 'https://api.cotacoes.uol.com/';
const BASE = '/uol-api';


router.get(`${BASE}/list`, async (req, res, next) => {

  const urlList = `${URL}asset/list/?format=JSON&fields=abbreviation,id,name`;

	try {

		const result = await get(urlList);
		const { data } = result;
		const list = parseArr(data.docs).map(stock => ({
			id: stock.id,
			abbr: parseSplitPos(stock.abbreviation, '.'),
			name: stock.name,
		}));

		return resOk(list, res);
	} catch (e) {

		return resIntegrationError(res);
	}
});

module.exports = router;
 
