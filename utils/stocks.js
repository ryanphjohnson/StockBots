this.all = {GetAllStocks: NotConfigured};
this.current = {GetCurrentStocks: NotConfigured};

function Init (config)
{
	this.all = require ("../" + config.stocks.all);
	this.current = require ("../" + config.stocks.current);
}

function GetStocks()
{
	this.all.GetAllStocks();
	this.current.GetCurrentStocks();
}

function NotConfigured()
{
	console.log (require ('./stats.js').BadNews ('Stocks were never configred!'));
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
	GetStocks: GetStocks
}
