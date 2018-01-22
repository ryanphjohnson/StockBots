var dollars = 2000,
stockMgr = require ("../utils/stocks.js");

function TakeAIAction (actions) {
	console.log ('TRAIN: Taking AI Action');
	for (var i=0; i < actions.length; i++) {
		console.log ("Im supposed to " + actions[i].take + " " + actions[i].stockId + " at " + actions[i].stockPrice + " with this many dollars " + actions [i].account.funds);
		let t = new stockMgr.Transaction();
		t.time = actions [i].time;
		t.price = actions [i].stockPrice;
		t.stockId = actions [i].stockId;
		t.action = actions [i].take;
		actions [i].account.transactions.push (t);

		if (t.action == "BUY") {
			if (actions [i].account.funds > t.price)
				actions [i].account.funds = actions [i].account.funds - t.price;
			else
				console.log ("Insufficient Funds!");
		} else {
			actions [i].account.funds + t.price;
		}
	}
}

module.exports = {
	TakeAIAction: TakeAIAction
}
