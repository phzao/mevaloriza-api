const STATUS_ENABLE = 'enable';
const STATUS_DISABLE = 'disable';
const STATUS_BLOCKED = 'blocked';
const HTTP_OK = 200;
const HTTP_SAVED = 201;
const HTTP_UPDATED = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_UNPROCESSABLE_ENTITY = 422;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;
const URL_LOCAL = '/api';
const URL_NETLIFY = '/.netlify/functions/api';
const UOL_API_URL = 'https://api.cotacoes.uol.com/';
const UOL_SOURCE = 'uol';

module.exports = {
  STATUS_ENABLE,
  STATUS_BLOCKED,
  STATUS_DISABLE,
  HTTP_OK,
  HTTP_SAVED,
  HTTP_UPDATED,
  HTTP_BAD_REQUEST,
  HTTP_UNAUTHORIZED,
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_FORBIDDEN,
  URL_LOCAL,
  URL_NETLIFY,
	UOL_API_URL,
	UOL_SOURCE,
};
