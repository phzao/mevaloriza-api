'use strict';

const express = require('express');
const router = express.Router();
const {
  stockPost,
  stockGetAllBy,
  stockGetById,
  stockDisableAll,
} = require('../controllers');

router.post('/stock', stockPost);
router.get('/stock', stockGetAllBy);
router.get('/stock/:id', stockGetById);
router.get('/stock-disable-all', stockDisableAll);

module.exports = router;

