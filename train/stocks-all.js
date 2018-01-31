var stockMgr = require ("../utils/stocks.js");

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
		https.get ("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol=" + symbol + "&apikey=D1EI5P94OS1MCOUJ", (resp) => {
		//https.get ("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=compact&symbol=" + symbol + "&apikey=D1EI5P94OS1MCOUJ", (resp) => {
			let data = "";
			// A chunk of data has been recieved.
			resp.on("data", (chunk) => {
				data += chunk;
			});
			// The whole response has been received. Print out the result.
			resp.on("end", () => {
				//console.log (data);
				//stock = ExtractStocks (symbol, data);
				resolve (JSON.parse (data));
			});
		}).on("error", (err) => {
			console.log("Error: " + err.message);
			reject();
		});
	})
}

function ExtractStocks (symbol, resp)
{
	console.log ("Beggining extraction");
	var ret = {},
	transactions = [],
	data = resp ['Time Series (Daily)'];

	for (var i in data) {
		let price = parseFloat (data[i]['4. close']);
		let transaction = new stockMgr.Transaction ();
		transaction.time = i;
		transaction.price = price;
		transactions.push (transaction);
		//console.log (transaction);
	}
	//if (data.length > 100) data.shift();

	ret [symbol] = {};
	ret [symbol] = {
		"stockId": symbol,
		"transactions": transactions
	};
	return ret;
}

module.exports = {
	GetAllStocks: GetAllStocks,
	ExtractStocks: ExtractStocks
}
