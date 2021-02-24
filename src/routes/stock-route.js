'use strict';

const express = require('express');
const router = express.Router();

router.get('/stock', (req, res, next) => {
  res.status(200).send({
    title: "Stock",
    version: "0.0.2"
  });
});

module.exports = router;

