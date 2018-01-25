// These will be overwritten and are only here to help with logic/autocomplete
var get = {GetAIAction: NotConfigured, Regenerate: NotConfigured},
take = {TakeAIAction: NotConfigured},
generation = 0;

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

function Regenerate ()
{
	get.Regenerate ();
	generation++;
	if (generation < 7)
		return true;
	else
		return false;
}

function NotConfigured()
{
	console.log (require ('./io.js').BadNews ('AI was never configred!'));
	process.exit (1);
}

function Action()
{
	var ret = {
		"stockId": "",
		"stockPrice": "",
		"time": "",
		"BUY": "BUY",
		"SELL": "SELL",
		"take": "",
		"account": ""
	};

	return ret;
}

module.exports = {
	Action: Action,
	Init: Init,
	Go: Go,
	Regenerate: Regenerate
}
