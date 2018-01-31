var all = {GetAllStocks: NotConfigured, ExtractStocks: NotConfigured},
current = {GetCurrentStocks: NotConfigured},
_stocks = null,
_iterator = 0;

function Init (config)
{
	all = require ("../" + config.stocks.all);
	current = require ("../" + config.stocks.current);
}

async function UpdateStocks()
{
	if (_stocks != null)
		return;
	var resp = await all.GetAllStocks ();
	_stocks = all.ExtractStocks ("MSFT", resp);
	_iterator = _stocks ["MSFT"].transactions.length - 78; // totes arbitrary
	//call extract here and save it to _stocks
}

function GetStocks (time)
{
	// Splice the transactions to the _iterator and return it
	//return all.ExtractStocks ("MSFT", _stocks, time);
	var ret = [],
	end = _stocks ["MSFT"].transactions.length > 100 ? 100 : _stocks ["MSFT"].transactions.length;
	ret ["MSFT"] = new Stock();
	ret ["MSFT"].transactions = _stocks ["MSFT"].transactions.slice (time, end);
	return ret;
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
		"stockId": "",
		"action": ""
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
