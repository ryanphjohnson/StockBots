async function GetAllStocks ()
{
	console. log ('TRAIN: Getting All Stocks');
	//For training/dev purposes we don't actually want all the stocks to be returned... we want to simulate the passage of time, so we're only going to send backa subset
	//Make request for stocks
	return new Promise ((resolve, reject) => {
		const https = require ("https");
		var stock,
		symbol = "MSFT";

		//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=demo
		//https.get ("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=" + symbol + "&apikey=demo", (resp) => {
		https.get ("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=demo", (resp) => {
			let data = "";
			// A chunk of data has been recieved.
			resp.on("data", (chunk) => {
				data += chunk;
			});
			// The whole response has been received. Print out the result.
			resp.on("end", () => {
				//console.log (data);
				//stock = ExtractStocks (symbol, data);
				resolve (data);
			});
		}).on("error", (err) => {
			console.log("Error: " + err.message);
			reject();
		});
	})
}

function ExtractStocks (symbol, json, time)
{
	var ret = {},
	transactions = [],
	data = JSON.parse (json) ['Time Series (Daily)'];
	//console.log (json);
	console.log ("Time is " + time);
	var morbidCounter = 0;

	// Chop off all the values that we're going to pretend don't exist right now
	for (var i in data) {
		if (i == time)
			break;
		morbidCounter++;
		delete data[i];
	}
	// Clean up the values we actually care about
	for (var i in data) {
		let transaction = parseFloat (data[i]['4. close']);
		transactions.push (transaction);
		//console.log (transaction);
	}

	ret [symbol] = {};
	ret [symbol] = {
		"stockId": symbol,
		"transactions": transactions,
		"lastPrice": transactions [0]
	};
	return ret;
}

module.exports = {
	GetAllStocks: GetAllStocks,
	ExtractStocks: ExtractStocks
}
