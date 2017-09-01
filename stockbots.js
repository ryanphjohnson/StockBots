// Rough draft of stock trading engine
//
// Check what mode we'll be running in
// 	We'll need 3 modes: Train, Test, and Prod
var MODELIST = {'train': 0, 'test': 1, 'prod': 2}; // List of running modes. If for some stupid reason you think you need another message you'll have to update this
var MODE = GetMode (MODELIST); // What mode to run in
var ai = {}; // MyHero ? MyHero : MyEnemy
var twit = {}; // Hopefully a reliable source of information... let that sink in
var stats = {}; // Evidence for the authorities
var stocks = {}; // List of all the stocks we're watching
var timeLord = {}; // God of time and torture, killer of men and finances. Not to be triffled with
//
// All modes will need twitter sentiment and list of twitter users and print stats
ai = require ('./utils/ai.js');
twit = require ('./utils/twitter.js');
stats = require ('./utils/stats.js');
stocks = require ('./utils/stocks.js');
//
// Include correct libraries depending on what mode we're running in
// 	There should be 2 versions of GetRelevantStocks, GetAIAction, Wait
// 	There should be 3 versions of GetCurrentStocks, TakeAIAction
switch (MODE) {
	case 'train':
		stocks.all = require ('./train/stocks-all.js');
		stocks.current = require ('./train/stocks-current.js');
		ai.get = require ('./train/action-get.js');
		ai.take = require ('./train/action-take.js');
		timeLord = require ('./train/wait.js');
		break;
	case 'test':

		break;
	case 'prod':

		break;
}
//
// Main Loop
//
// 	Get Latest Tweets
	twit.GetTweets();
// 	Get stocks
	stocks.GetStocks();
// 	Magic
	ai.Go();
// 	Print Stats
	stats.Print ();
// 	Check if we need to exit loop
	console.log ('Check exit condition');
// 	Wait
	timeLord.wait();

function GetMode (modeList) {
	var mode = '';

	for (arg in process.argv) {
		if (process.argv [arg] in modeList)
			mode = process.argv [arg];
	}
	if (!mode)
		process.exit (1);

	console.log ('Trading in ' + require ('./utils/stats.js').GoodNews (mode.toUpperCase()) + ' mode');
	return mode;
}
