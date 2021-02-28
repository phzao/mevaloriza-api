'use strict';

const express = require('express');
const router = express.Router();
const { stockPost, stockGet } = require('../controllers');

router.post('/stock', stockPost);
router.get('/stock', stockGet);

module.exports = router;

