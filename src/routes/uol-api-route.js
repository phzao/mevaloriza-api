 'use strict';

const express = require('express');
const router = express.Router();

router.get('/uol-api', (req, res, next) => {
  res.status(200).send({
    title: "Uol-api",
    version: "0.0.2"
  });
});

module.exports = router;
 

