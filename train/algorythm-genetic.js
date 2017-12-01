function GetAction (stocks)
{
	console.log ("Getting Genetic Acctions");
	//Loop over Chromosomes and pass in stocks
	//build up list of actions
	//return actions
}
// This will help us prevent losing money
// We want to make sure that any action taken prevents us from losing money
// Make sure we're looking at networth
function CostFunction () 
{
// This is the function that will largely determine if this project is a success or failure... don't give up on this piece
}

// We want to make sure that any action taken makes us money
// Make sure we're looking at networth
function FitnessFunction () 
{
// This is the function that will largely determine if this project is a success or failure... don't give up on this piece
}

// Here is where stuff starts getting cool
// We need to think really hard about what values we care about
function Chromosome () 
{
	this.fitnessScore; // Quality of magic
	this.genes; // Insert magic here
}

// Desired Goals:
// Find a solid rock to build off of
// Use statistics like standard deviation
// Find a trend line. Find the standard length of a trend line. Find an abnormally long trend and sell.
// Use the trend line to inform confidence levels. As trend continues for extended period of time, confidence to the trend continuing should decrease
// Branch off of solid foundation to increase odds of good returns
// Allow peaking at other stocks as clues to what may be good signs or bad signs and give weight to each individual sign. Relatively easy
// Give each gene a chance to hedge bets, with low confidence purchases or sells. We need a way to mark confidence level. This is probably difficult
function Gene () 
{
	this.qty;
	this.purchasePrices;
	this.fitnessScore;
	this.prvTrend; // Not in use yet
	this.dna = {
		stockID : null,
		sellThreshold : null,
		buyThreshold : null,
		trendLength : null,
		relatives : null, // Not in use yet
		relativeWeight : null // Not in use yet
	}
}

// Here we'll play dr frankenstein with our precious chromosomes
// Mix and Match genetic code
function MateChromosomes (mom, dad) 
{
	// Find best genes from mom and dad. Make a new chromosome based off best genes from both
}

function MateGenes (mom, dad)
{

}

// Radiation is rad
// Add random genetic mutation
function Mutate (victim) 
{
	// Find random genes and give random values a push
}

function GetTrends (stocks, interestedStock, trendPoints)
{

}

module.exports = {
	GetAction: GetAction
}
