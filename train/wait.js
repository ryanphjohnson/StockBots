var times = [],
iterator = 0;

async function Init (stockMgr)
{
	await stockMgr.UpdateStocks();
	//stockMgr.GetStocks (new Date().toLocaleDateString());
	var resp = stockMgr.GetRawResponse ();
	var data = resp ['MSFT'].transactions ;
	for (var time in data) {
		times.push (time);
	}
	console.log ("We have data for " + times.length + " days");
	Restart ();
}

function Wait() {
	//console.log ('TRAIN: Waiting...');
}

function Time()
{
	//console.log ("Getting time");
	return --iterator;
}

function EndOfTimes ()
{
	return !iterator;
}

function Restart ()
{
	iterator = times.length - 78; // Completely arbitrary
}

module.exports = {
	Init: Init,
	Wait: Wait,
	Time: Time,
	EndOfTimes: EndOfTimes,
	Restart: Restart
}
