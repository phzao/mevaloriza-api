'use strict';

const express = require('express');
const router = express.Router();
const { stockPost } = require('../controllers');

router.post('/stock', stockPost);

module.exports = router;

