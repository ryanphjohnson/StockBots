var genetics = require ("./algorythm-genetic.js"),
bayes = require ("./algorythm-bayesian-belief.js"),
nn = require ("./algorythm-neural-network.js");

function Init (config)
{
	genetics.Init (config);
	bayes.Init (config);
	nn.Init (config);
}

function GetAIAction (stocks) 
{
	console.log ('TRAIN: Getting AI Action');
	var genetics = require ("./algorythm-genetic.js"),
	bayes = require ("./algorythm-bayesian-belief.js"),
	nn = require ("./algorythm-neural-network.js"),
	actions = [],
	ga = [],
	ba = [],
	na = [];

	ga = genetics.GetAction (stocks);
	ba = bayes.GetAction (stocks);
	na = nn.GetAction (stocks);
	if (ga) actions = actions.concat (ga);
	if (ba) actions = actions.concat (ba);
	if (na) actions = actions.concat (na);
	

	console.log ("Actions: " + actions);
	console.log ("GA: " + ga.length);
	console.log ("BA: " + ba.length);
	console.log ("NA: " + na.length);
	return actions;
}

module.exports = {
	Init: Init,
	GetAIAction: GetAIAction
}
