// These will be overwritten and are only here to help with logic/autocomplete
this.get = {GetAIAction: function(){}};
this.take = {TakeAIAction: function(){}};

function Go() {
	this.get.GetAIAction();
	this.take.TakeAIAction();
}

module.exports = {
	Go: Go
}
