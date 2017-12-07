function TakeAIAction (actions) {
	console.log ('TRAIN: Taking AI Action');
	for (var action in actions) {
		console.log ("taking action: " + action.take + " " + action.stockId);
	}
}

module.exports = {
	TakeAIAction: TakeAIAction
}
