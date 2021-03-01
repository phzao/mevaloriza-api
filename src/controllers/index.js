const StockController = require('./stock-controller');
const UolController = require('./uol-integration-controller');

module.exports = {
	...StockController,
	...UolController,
};
