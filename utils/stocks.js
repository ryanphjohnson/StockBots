var all = {GetAllStocks: NotConfigured, ExtractStocks: NotConfigured};
var current = {GetCurrentStocks: NotConfigured};
var _stocks = [];

function Init (config)
{
	all = require ("../" + config.stocks.all);
	current = require ("../" + config.stocks.current);
}

async function UpdateStocks()
{
	if (_stocks.length)
		return;
	_stocks = await all.GetAllStocks ();
}

function GetStocks (time)
{
	return all.ExtractStocks ("MSFT", _stocks, time);
}

function GetRawResponse ()
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
	GetStocks: GetStocks,
	GetRawResponse: GetRawResponse
}
