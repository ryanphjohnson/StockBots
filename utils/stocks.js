this.all = {GetAllStocks: function(){}};
this.current = {GetCurrentStocks: function(){}};

function GetStocks() {
	this.all.GetAllStocks();
	this.current.GetCurrentStocks();
}

module.exports = {
	GetStocks: GetStocks
}
