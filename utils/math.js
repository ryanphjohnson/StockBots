function Average (numbers)
{
	var ret = 0;

	for (var i in numbers) {
		ret += i;
	}
	ret = ret / numbers.length;

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
		rise = (x[i] - xAvg) * (y[i] - yAvg);
		run = (x[i] - xAvg) * (x[i] - xAvg);
		riseSum += rise;
		runSum += run;
	}

	return riseSum / runSum;
}

module.exports = {
	LeastSquares: LeastSquares
}
