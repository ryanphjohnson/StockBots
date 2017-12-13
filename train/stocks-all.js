async function GetAllStocks()
{
	console. log ('TRAIN: Getting All Stocks');
	//Make request for stocks
	return new Promise (MakeRequest);
}

function MakeRequest (resolve)
{
	const https = require ("https");
	var stock,
	symbol = "MSFT";
 
	//https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=demo
	https.get ("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + symbol + "&apikey=demo", (resp) => {
		let data = "";
		// A chunk of data has been recieved.
		resp.on("data", (chunk) => {
			data += chunk;
		});
		// The whole response has been received. Print out the result.
		resp.on("end", () => {
			stock = CleanResponse (symbol, data);
			resolve (stock);
		});
	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});
}

function CleanResponse (symbol, json)
{
	var ret = {},
	transactions = [],
	data = JSON.parse (json) ['Time Series (Daily)'];

	for (var i in data) {
		let transaction = data[i]['4. close'];
		transactions.push (transaction);
		console.log (transaction);
	}

	ret [symbol] = {};
	ret [symbol]["stockId"] = symbol;
	ret [symbol]["transactions"] = transactions;
	return ret;
}

module.exports = {
	GetAllStocks: GetAllStocks
}
