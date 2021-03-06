// Rough draft of stock trading engine

var envs = GetModeList();
mode = GetMode (envs), // What mode to run in
config = envs [mode],
ai = require ('./utils/ai.js'), // MyHero ? MyHero : MyEnemy
twit = require ('./utils/twitter.js'), // Hopefully a reliable source of information... let that sink in
stats = require ('./utils/stats.js'), // Evidence for the authorities
stockMgr = require ('./utils/stocks.js'), // List of all the stocks we're watching
timelord = require (config.timelord), // God of time and torture, killer of men and finances. Not to be triffled with
cont = true,
debug = 0;

Runner();

// Main Loop
async function Runner()
{
	stockMgr.Init (config);
	await timelord.Init (stockMgr);
	ai.Init (config);
	console.log ();

	while (cont) {
	// 	Get Latest Tweets
		//twit.GetTweets();
	// 	Get stocks
		await stockMgr.UpdateStocks ();
	// 	Magic
		ai.Go (stockMgr.GetStocks (timelord.Time ()));
	// 	Check if we need to exit loop
		cont = Status (ai, timelord);
	// 	Wait
		if (cont)
			timelord.Wait();
	//	DEBUG
		if (debug)
			console.log (debug);
		//debug++;
	}

	console.log ();
// 	Print Stats
	stats.Print ();
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
			"timelord" : "./train/wait.js"
		}
	};

	return modes;
}

function Status (ai, timelord)
{
	if (timelord.EndOfTimes ()) {
		if (ai.Regenerate ()) {
			timelord.Restart ();
		} else {
			return false;
		}
	}

	return true;
}
