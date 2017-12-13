const io = require ("../utils/io.js");
function Print () 
{
	console.log ('Super Cool Stats about ' + io.GoodNews ('$$$$') + ' and ' + io.BadNews ('Performance'));
}


function Status () 
{
	return "Test Status";
}

module.exports = {
	Print: Print,
	Status: Status
}
