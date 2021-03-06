'use strict';

const express = require('express');
const router = express.Router();
const { stockPost, stockGet, stockDisableAll } = require('../controllers');

router.post('/stock', stockPost);
router.get('/stock', stockGet);
router.get('/stock-disable-all', stockDisableAll);

module.exports = router;

