'use strict';

const parseArr = arr => (arr && Array.isArray(arr) && arr) || [];

const parseSplitPos = (str, char, position = 0) =>
  (str && str.split(char)[position]) || '';

const parseColumnToText = (str, char) => str && str.split(char).join(' ');

const parseErrorMsg = (type, msg) => ({
  error: type,
  message: msg,
});

const parseUolStock = stock => ({
  id: stock.id,
  abbreviation: parseSplitPos(stock.abbreviation, '.'),
  name: stock.name,
});

module.exports = {
  parseArr,
  parseSplitPos,
  parseErrorMsg,
  parseColumnToText,
  parseUolStock,
};
