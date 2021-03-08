'use strict';

const ERRORS = {
  404: 'Register not found!'
};

const useError = (code, msg) => {
  return ERRORS[code] && ERRORS[code]
}

module.exports = {
  useError,
};

