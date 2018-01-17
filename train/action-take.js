var dollars = 1000;

function TakeAIAction (actions) {
	//console.log ('TRAIN: Taking AI Action');
	for (var i=0; i < actions.length; i++) {
		console.log ("Im supposed to do " + actions[i].take + " " + actions[i].stockId + " at " + actions[i].stockPrice + " with this many dollars " + dollars);
	}
}

module.exports = {
	TakeAIAction: TakeAIAction
}
