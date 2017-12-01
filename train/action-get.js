function GetAIAction (stocks) 
{
	console.log ('TRAIN: Getting AI Action');
	var genetics = require ("./algorythm-genetic.js"),
	bayes = require ("./algorythm-bayesian-belief.js"),
	nn = require ("./algorythm-neural-network.js");

	genetics.GetAction (stocks);
	bayes.GetAction (stocks);
	nn.GetAction (stocks);

	return;
}

module.exports = {
	GetAIAction: GetAIAction
}
