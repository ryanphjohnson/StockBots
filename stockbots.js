// Rough draft of stock trading engine

var envs = require ('./config.json').environments,
mode = GetMode (envs), // What mode to run in
config = envs [mode],
ai = require ('./utils/ai.js'), // MyHero ? MyHero : MyEnemy
twit = require ('./utils/twitter.js'), // Hopefully a reliable source of information... let that sink in
stats = require ('./utils/stats.js'), // Evidence for the authorities
stocks = require ('./utils/stocks.js'), // List of all the stocks we're watching
timelord = require (config.timelord), // God of time and torture, killer of men and finances. Not to be triffled with
cont = true,
debug;

stocks.Init (config);
ai.Init (config);
Runner();

// Main Loop
async function Runner()
{
	while (cont) {
	// 	Get Latest Tweets
		twit.GetTweets();
	// 	Get stocks
		await stocks.GetStocks();
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

	console.log ('Trading in ' + require ('./utils/io.js').GoodNews (mode.toUpperCase()) + ' mode');
	return mode;
}

function Status ()
{
	console.log ('Check exit condition');
	return false;
}
