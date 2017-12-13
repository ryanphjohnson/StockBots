function TakeAIAction (actions) {
	console.log ('TRAIN: Taking AI Action');
	console.log ("Action length: " + actions.length);
	
	for (var action in actions) {
		console.log ("taking action: " + action.take + " " + action.stockId);
	}
}

module.exports = {
	TakeAIAction: TakeAIAction
}
