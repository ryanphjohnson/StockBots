// Rough draft of stock trading engine

var envs = GetModeList();
mode = GetMode (envs), // What mode to run in
config = envs [mode],
ai = require ('./utils/ai.js'), // MyHero ? MyHero : MyEnemy
twit = require ('./utils/twitter.js'), // Hopefully a reliable source of information... let that sink in
stats = require ('./utils/stats.js'), // Evidence for the authorities
stockMgr = require ('./utils/stocks.js'), // List of all the stocks we're watching
timelord = mode.timelord, // God of time and torture, killer of men and finances. Not to be triffled with
cont = true,
debug = null;

stockMgr.Init (config);
ai.Init (config);
Runner();

// Main Loop
async function Runner()
{
	while (cont) {
	// 	Wait
	//	timelord.wait();
	// 	Get Latest Tweets
		twit.GetTweets();
	// 	Get stocks
		await stockMgr.UpdateStocks();
	// 	Magic
		ai.Go (stockMgr.GetStocks());
	// 	Print Stats
		stats.Print();
	// 	Check if we need to exit loop
		cont = Status();
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

function GetModeList ()
{
	var modes = {
		"train" : {
			"stocks" : {
				"all" : "train/stocks-all.js",
				"current" : "train/stocks-current.js",
				"pool" : ["TSLA", "GOOG", "AAPL", "MSFT", "AMZN"]
			},
			"ai" : {
				"get" : "train/action-get.js",
				"take" : "train/action-take.js"
			},
			"timelord" : {"timelord" : "./train/wait.js"}
		}
	};

	return modes;
}

function Status ()
{
	console.log ('Check exit condition');
	return false;
}
