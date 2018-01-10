async function GetAllStocks()
{
	console. log ('TRAIN: Getting All Stocks');
	//Make request for stocks
	return new Promise (MakeRequest);
}

function MakeRequest (resolve, reject)
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
		reject();
	});
}

function CleanResponse (symbol, json)
{
	var ret = {},
	transactions = [],
	data = JSON.parse (json) ['Time Series (Daily)'];

	for (var i in data) {
		let transaction = parseInt (data[i]['4. close']);
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
