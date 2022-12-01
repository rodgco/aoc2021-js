function sumLargers(input: Array<number>): number {
	return input.reduce(
		(result, last) => {
			if (last > result.last) result.sum++;
			result.last = last;
			return result;
		},
		{ last: -1, sum: -1 }
	).sum;
}

function extractSlidingWindow(
	input: Array<number>,
	windowSize: number = 3,
	callBack: Function
): Array<number> {
	return input.slice(0, -windowSize + 1).map((_v, n) => {
		let result: number = 0;
		for (let i = 0; i < windowSize; i++) {
			result = callBack(result, input[n + i]);
		}
		return result;
	});
}
function part1(input: Array<string>) {
	const measures = input.map((v) => parseInt(v));
	return sumLargers(measures);
}

function part2(input: Array<string>) {
	const measures = input.map((v) => parseInt(v));
	const tmsw = extractSlidingWindow(
		measures,
		3,
		(a: number, v: number) => a + v
	);
	// const tmsw = measures.slice(0, measures.length-2).map((_v, i) => measures[i] + measures[i+1] + measures[i+2])
	return sumLargers(tmsw);
}

export { part1, part2 };
