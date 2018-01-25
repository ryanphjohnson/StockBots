var chromosomePopulation = 1,
genePopulation = 10,
genes = [],
chromosomes = [],
ai = require ("../utils/ai.js"),
math = require ("../utils/math.js");

function Init()
{
	//Create Chromosomes
	//TODO: Check for exported genes/chromosomes first!
	console.log ("Creating Chromosomes and Genes");
	for (var i=0; i < genePopulation; i++) {
		var gene = new Gene();
		gene.dna.stockId = "MSFT"; //TODO: Need a real way to randomly choose a stock
		gene.dna.sellThreshold = Math.random() * 2 - 1; //TODO: It would probably be wise to set a max of like 90 seeing how that is the MAX slope that could ever even occur...
		gene.dna.buyThreshold = Math.random() * 2 - 1; //TODO: It would probably be wise to set a max of like 90 seeing how that is the MAX slope that could ever even occur...
		gene.dna.trendLength = Math.floor (Math.random() * 100); //TODO: I really have no clue what a good max for this should be... needs more thought
		gene.dna.expression = 1; //Math.floor (Math.random() * 2);
		genes.push (gene);
	}
	for (var i=0; i < chromosomePopulation; i++) {
		var chromosome = new Chromosome();
		chromosome.genes = genes; //TODO: don't do this
		chromosomes.push (chromosome);
	}
	console.log ("There are " + chromosomes.length + " chromosomes and " + genes.length + " genes");
}

function GetAction (stocks)
{
	var actions = [];
	//Loop over Chromosomes and pass in stocks
	for (var i=0; i < chromosomePopulation; i++) {
		//Check fitness of chromosome
		FitnessFunction (chromosomes [i], stocks);
		for (var j=0; j < chromosomes [i].genes.length; j++) {
			//Check fitness of gene
			//Get relevant stock, check conditions, if action is necessary - take it
			var gene = chromosomes [i].genes [j];
			if (!gene.dna.expression)
				continue;
			var stock = stocks [gene.dna.stockId],
			trend = GetTrend (stock, gene.dna.trendLength),
			action = new ai.Action();

			if (trend > gene.dna.buyThreshold)
				action.take = action.BUY;
			else if (gene.account.transactions.length && trend < gene.dna.sellThreshold)
				action.take = action.SELL;
			else
				continue;

			if (action.take == "SELL")
				console.log ("I'm actually going to sell!");

			action.stockId = gene.dna.stockId;
			action.account = gene.account;
			action.stockPrice = stock.transactions [0].price;
			action.time = stock.transactions [0].time;
			actions.push (action);
		}
	}
	return actions;
}

function Regenerate ()
{
	// Sort by the top 5% of genes, and mutate them to fill out the other 95%
	console.log();
	for (var i=0; i < chromosomePopulation; i++) {
		chromosomes [i].genes.sort (function (a, b) {
			return b.fitnessScore - a.fitnessScore;
		});
	}
	var winners = Math.ceil (genePopulation * .05);
	losers = genePopulation - winners;
	//console.log ("Winning gene looked like this: " + JSON.stringify (chromosomes [0].genes [0]));

	for (var i=0; i < chromosomePopulation; i++) {
		for (var j=0; j < chromosomes [i].genes.length; j++) {
			//if (chromosomes [i].genes [j].fitnessScore > 0)
			//	console.log ("We have a winner!");
	//			console.log ("Gene " + j + " was a winner! Its score was " chromosomes [i].genes [j].fitnessScore);
			let topGene = chromosomes [i].genes [0];
			chromosomes [i].genes [j].account = [];
			chromosomes [i].genes [j].fitnessScore = 0;
			//chromosomes [i].genes [j] = Mutate (topGene);
			chromosomes [i].genes [j] = MateGenes (topGene, chromosomes [i].genes [j]);
			//console.log ("Gene is " + JSON.stringify (chromosomes [i].genes [j]));
		}
	}
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
function FitnessFunction (chromosome, stocks)
{
// This is the function that will largely determine if this project is a success or failure... don't give up on this piece
	var fitness = 0;
	//Loop over genes, see what they bought, and at what price, and what the current price is. Making money is good, losing money is bad
	for (var i=0; i < chromosome.genes.length; i++) {
		let geneFit = 0;

		for (var j=0; j < chromosome.genes [i].account.transactions.length; j++) {
			geneFit += stocks [chromosome.genes [i].dna.stockId].transactions [0].price - chromosome.genes [i].account.transactions [j].price; //+ chromosome.genes [i].account.funds;
		}

		chromosome.genes [i].fitnessScore = geneFit;
		fitness += geneFit;
	}

	chromosome.fitnessScore = fitness;
	console.log ("Chromosome fitness score is: " + fitness);
}

// Here is where stuff starts getting cool
// We need to think really hard about what values we care about
function Chromosome ()
{
	var ret = {
		fitnessScore: "", // Quality of magic
		genes: [] // Insert magic here
	}
	return ret;
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
	var ret = {
		account: new stockMgr.Account (),
		fitnessScore: 0,
		prvTrend: "",
		dna: {
			stockId: null,
			sellThreshold: null,
			buyThreshold: null,
			trendLength: null,
			expression: null,
			relatives: null, // Not in use yet
			relativeWeight: null // Not in use yet
		}
	};
	return ret;
}

// Here we'll play dr frankenstein with our precious chromosomes
// Mix and Match genetic code
function MateChromosomes (mom, dad)
{
	// Find best genes from mom and dad. Make a new chromosome based off best genes from both
}

function MateGenes (mom, dad)
{
	var gene = new Gene();

	gene.dna.expression = 1;
	gene.dna.stockId = mom.dna.stockId;
	gene.dna.sellThreshold = (mom.dna.sellThreshold + dad.dna.sellThreshold) / 2
	gene.dna.buyThreshold = (mom.dna.buyThreshold + dad.dna.buyThreshold) / 2
	gene.dna.trendLength = (mom.dna.trendLength + dad.dna.trendLength) / 2

	return gene;
}

// Radiation is rad
// Add random genetic mutation
function Mutate (victim)
{
	// Find random genes and give random values a push
	var gene = new Gene ();
	var mutation = Math.floor (Math.random () * 3);
	gene.dna.expression = 1;
	gene.dna.stockId = victim.dna.stockId;
	gene.dna.sellThreshold = victim.dna.sellThreshold;
	gene.dna.buyThreshold = victim.dna.buyThreshold;
	gene.dna.trendLength = victim.dna.trendLength;

	switch (mutation) {
		case 0:
			gene.dna.sellThreshold = Math.random() * 2 - 1;
			break;
		case 1:
			gene.dna.buyThreshold = Math.random() * 2 - 1;
			break;
		case 2:
			gene.dna.trendLength = Math.floor (Math.random() * 100);
			break;
	}

	return gene;
}

/** Programmer Beware. Maths ahead **/
function GetTrend (stock, length)
{
	var ret = 0; //TODO: Just for build/debug purposes. Totes Obvs
	//console.log ("This stock has " + stock.transactions.length + " transactions and we want to grab " + length);
	if (length > stock.transactions.length) length = stock.transactions.length;
	var start = stock.transactions.length - length;
	//console.log ("Ill be taking " + start + " til " + stock.transactions.length);
	var relevantPoints = stock.transactions.slice (start, stock.transactions.length);
	var dayIds = [];
	var pricePoints = [];
	for (var i = 0; i < relevantPoints.length; i++) {
		dayIds.push (i+1);
		pricePoints.push (relevantPoints [i].price);
	}

	//Perform Least Squares Linear Regression
	ret = math.LeastSquares (dayIds, pricePoints);
	
	return ret;
}

module.exports = {
	Init: Init,
	GetAction: GetAction,
	Regenerate: Regenerate
}
