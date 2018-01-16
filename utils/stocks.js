this.all = {GetAllStocks: NotConfigured};
this.current = {GetCurrentStocks: NotConfigured};
var _stocks = [];

function Init (config)
{
	this.all = require ("../" + config.stocks.all);
	this.current = require ("../" + config.stocks.current);
}

async function UpdateStocks()
{
	_stocks = await this.all.GetAllStocks();
	for (var i in _stocks) {
		console.log (i);
	}
}

function GetStocks()
{
	return _stocks;
}

function NotConfigured()
{
	console.log (require ('./io.js').BadNews ('Stocks were never configred!'));
	process.exit (1);
}

function Stock ()
{
	this.transactions = [];
}

function Transaction ()
{
	this.time;
	this.price;
}

module.exports = {
	Init: Init,
	UpdateStocks: UpdateStocks,
	GetStocks: GetStocks
}
