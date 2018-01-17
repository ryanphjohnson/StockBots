var times = [],
    iterator = 0;

async function Init (stockMgr)
{
	await stockMgr.UpdateStocks();
	//stockMgr.GetStocks (new Date().toLocaleDateString());
	var json = stockMgr.GetRawResponse ();
	var data = JSON.parse (json) ['Time Series (Daily)'];
	for (var time in data) {
		times.push (time);
	}
	iterator = times.length - 78; // Completely arbitrary
}
function Wait() {
	//console.log ('TRAIN: Waiting...');
}

function Time()
{
	//console.log ("Getting time");
	return times [--iterator];
}

function EndOfTimes ()
{
	return !iterator;
}

module.exports = {
	Init: Init,
	Wait: Wait,
	Time: Time,
	EndOfTimes: EndOfTimes
}
