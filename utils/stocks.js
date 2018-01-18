var all = {GetAllStocks: NotConfigured, ExtractStocks: NotConfigured},
current = {GetCurrentStocks: NotConfigured},
_stocks = [];

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
	return {"transactions": []};
}

function Transaction ()
{
	var ret = {
		"time": "",
		"price": "",
		"stockId": ""
	};
	return ret;
}

function Account ()
{
	var ret = {
		"funds": 1000,
		"transactions": []
	}
	return ret;
}

module.exports = {
	Init: Init,
	UpdateStocks: UpdateStocks,
	Transaction: Transaction,
	Account: Account,
	GetStocks: GetStocks,
	GetRawResponse: GetRawResponse
}
