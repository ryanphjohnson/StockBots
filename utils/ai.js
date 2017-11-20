// These will be overwritten and are only here to help with logic/autocomplete
this.get = {GetAIAction: NotConfigured};
this.take = {TakeAIAction: NotConfigured};

function Go() {
	this.get.GetAIAction();
	this.take.TakeAIAction();
}

function NotConfigured() {
	console.log (require ('./stats.js').BadNews ('AI was never configred!'));
	process.exit (1);
}

module.exports = {
	Go: Go,
	get: this.get,
	take: this.take
}
