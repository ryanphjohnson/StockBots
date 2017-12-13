const io = require 
function Print () 
{
	console.log ('Super Cool Stats about ' + GoodNews ('$$$$') + ' and ' + BadNews ('Performance') + Reset);
}


function Status () 
{
	return "Test Status";
}

module.exports = {
	Print: Print,
	Status: Status,
	GoodNews: GoodNews,
	BadNews: BadNews
}
