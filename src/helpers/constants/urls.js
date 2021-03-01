const URL_LOCAL = '/api';
const URL_NETLIFY = '/.netlify/functions/api';
const UOL_API_URL = 'https://api.cotacoes.uol.com/';
const UOL_SOURCE = 'uol';
const UOL_STOCK_LIST = `${UOL_API_URL}asset/list/?format=JSON&fields=abbreviation,id,name`;

module.exports = {
  URL_LOCAL,
  URL_NETLIFY,
  UOL_API_URL,
  UOL_SOURCE,
	UOL_STOCK_LIST,
};

