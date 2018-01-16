async function GetAllStocks()
{
	console. log ('TRAIN: Getting All Stocks');
	//For training/dev purposes we don't actually want all the stocks to be returned... we want to simulate the passage of time, so we're only going to send backa subset
	//Make request for stocks
	return new Promise (MakeRequest);
}

function MakeRequest (resolve, reject)
{
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
			stock = ExtractStocks (symbol, data);
			resolve (stock);
		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);
		reject();
	});
}

function ExtractStocks (symbol, json)
{
	var ret = {},
	transactions = [],
	data = JSON.parse (json) ['Time Series (Daily)'];

	for (var i in data) {
		let transaction = parseFloat (data[i]['4. close']);
		transactions.push (transaction);
		//console.log (transaction);
	}

	ret [symbol] = {};
	ret [symbol] = {
		"stockId": symbol,
		"transactions": transactions,
		"lastPrice": transactions [transactions.length-1]
	};
	return ret;
}

module.exports = {
	GetAllStocks: GetAllStocks
}
