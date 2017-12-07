// These will be overwritten and are only here to help with logic/autocomplete
this.get = {GetAIAction: NotConfigured};
this.take = {TakeAIAction: NotConfigured};

/** Look at the config.json file to see which Get/TakeAIAction is being called **/
function Init (config)
{
	this.get = require ("../" + config.ai.get);
	this.take = require ("../" + config.ai.take);
}

function Go()
{
	this.take.TakeAIAction (this.get.GetAIAction());
}

function NotConfigured()
{
	console.log (require ('./stats.js').BadNews ('AI was never configred!'));
	process.exit (1);
}

function Action()
{
	this.stockId;
	this.BUY = "BUY";
	this.SELL = "SELL";
	this.take;
}

module.exports = {
	Init: Init,
	Go: Go
}
