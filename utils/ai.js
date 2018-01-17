// These will be overwritten and are only here to help with logic/autocomplete
var get = {GetAIAction: NotConfigured};
var take = {TakeAIAction: NotConfigured};

function Init (config)
{
	get = require ("../" + config.ai.get);
	take = require ("../" + config.ai.take);
	get.Init (config);
}

function Go (stocks)
{
	take.TakeAIAction (get.GetAIAction (stocks));
}

function NotConfigured()
{
	console.log (require ('./io.js').BadNews ('AI was never configred!'));
	process.exit (1);
}

function Action()
{
	this.stockId;
	this.stockPrice;
	this.BUY = "BUY";
	this.SELL = "SELL";
	this.take;
}

module.exports = {
	Action: Action,
	Init: Init,
	Go: Go
}
