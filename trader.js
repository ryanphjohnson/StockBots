// Rough draft of trading engine
//
// Check what mode we'll be running in
// 	We'll need 3 modes: Train, Test, and Prod
//
// Include correct libraries depending on what mode we're running in
// 	There should be 2 versions of GetRelevantStocks, GetAIAction, Wait
// 	There should be 3 versions of GetCurrentStocks, TakeAIAction
//
// All modes will need twitter sentiment and list of twitter users and PrintStats
//
// Main Loop
//
// 	Get Latest Tweets
	console.log ('Getting Tweets');
// 	Get Sentiment of tweets
	console.log ('Getting Sentiment of Tweets');
// 	Get Relavent stock
	console.log ('Getting Relevant Stocks');
// 	Get current stocks owned
	console.log ('Getting Current Stocks');
// 	Request AI for correct action to take
	console.log ('Getting AI Action');
// 	Take AI's action, while checking we have the funds to do it
	console.log ('Take AI Action');
// 	Print Stats
	console.log ('Print Stats');
// 	Check if we need to exit loop
	console.log ('Check exit condition');
// 	Wait
	console.log ('Wait');
