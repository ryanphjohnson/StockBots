this.all = {GetAllStocks: NotConfigured};
this.current = {GetCurrentStocks: NotConfigured};
this.stocks = [];

function Init (config)
{
	this.all = require ("../" + config.stocks.all);
	this.current = require ("../" + config.stocks.current);
}

async function GetStocks()
{
	this.stocks = await this.all.GetAllStocks();
	for (var i in this.stocks) {
		console.log (i);
	}
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
	GetStocks: GetStocks,
	stocks: this.stocks
}
