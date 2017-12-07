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
	actions = ga.concat (ba).concat (nn);

	return actions;
}

module.exports = {
	GetAIAction: GetAIAction
}
