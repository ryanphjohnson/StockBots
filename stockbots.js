// Rough draft of stock trading engine

var envs = require ('./config.json').environments,
ai = require ('./utils/ai.js'), // MyHero ? MyHero : MyEnemy
twit = require ('./utils/twitter.js'), // Hopefully a reliable source of information... let that sink in
stats = require ('./utils/stats.js'), // Evidence for the authorities
stocks = require ('./utils/stocks.js'), // List of all the stocks we're watching
timelord = {}, // God of time and torture, killer of men and finances. Not to be triffled with
mode = GetMode (envs), // What mode to run in
conf = envs [mode],
cont = true,
debug;

stocks.all = require (conf.stocks.all);
stocks.current = require (conf.stocks.current);
ai.get = require (conf.ai.get);
ai.take = require (conf.ai.take);
timelord = require (conf.timelord);

// Main Loop
while (cont) {
// 	Get Latest Tweets
	twit.GetTweets();
// 	Get stocks
	stocks.GetStocks();
// 	Magic
	ai.Go (stocks);
// 	Print Stats
	stats.Print ();
// 	Check if we need to exit loop
	cont = Status();
// 	Wait
	if (cont)
		timelord.wait();
//	DEBUG
	if (debug)
		console.log (debug);
}

// Check what mode we'll be running in
function GetMode (modes) 
{
	var mode = '';

	for (arg in process.argv) {
		if (process.argv [arg] in modes)
			mode = process.argv [arg];
	}
	if (!mode)
		process.exit (1);

	console.log ('Trading in ' + require ('./utils/stats.js').GoodNews (mode.toUpperCase()) + ' mode');
	return mode;
}

function Status () 
{
	console.log ('Check exit condition');
	return false;
}
