function Average (numbers)
{
	var sum = 0;

	for (var i in numbers) {
		sum += numbers [i];
	}
	var ret = sum / numbers.length;

	return ret;
}

function LeastSquares (xs, ys)
{
	var xAvg = Average (xs),
	yAvg = Average (ys),
	rise = 0,
	run = 0,
	riseSum = 0,
	runSum = 0;

	for (var i=0; i < xs.length; i++) {
		rise = (xs[i] - xAvg) * (ys[i] - yAvg);
		run = (xs[i] - xAvg) * (xs[i] - xAvg);
		riseSum += rise;
		runSum += run;
	}

	return riseSum / runSum;
}

module.exports = {
	LeastSquares: LeastSquares
}
