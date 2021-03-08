'use strict';

const formatHttpException = (code, msg) => ({
  code,
  message: msg,
});

module.exports = {
  formatHttpException,
};

