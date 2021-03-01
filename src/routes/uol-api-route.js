'use strict';

const express = require('express');
const router = express.Router();

const { syncStockList } = require('../controllers');
const BASE = '/uol-api';

router.post(`${BASE}/sync-stock-list`, syncStockList);

module.exports = router;
