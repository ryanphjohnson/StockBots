var genetics = require ("./algorythm-genetic.js"),
bayes = require ("./algorythm-bayesian-belief.js"),
nn = require ("./algorythm-neural-network.js");

function Init (config)
{
	genetics.Init ();
	bayes.Init (config);
	nn.Init (config);
}

function GetAIAction (stocks) 
{
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
	
	//console.log ("Genetic Actions: " + ga.length + " Bayesian Actions: " + ba.length + " Neural Actions: " + na.length);
	return actions;
}

function Regenerate ()
{
	genetics.Regenerate ();
}

module.exports = {
	Init: Init,
	GetAIAction: GetAIAction,
	Regenerate: Regenerate
}
