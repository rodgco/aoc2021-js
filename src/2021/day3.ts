type Digits = '0' | '1';

function mostCommon(
	input: Array<string>,
	position: number,
	favor: Digits = '0'
): Digits {
	const zeros = input.reduce(
		(acc, binary) => (binary[position] === '0' ? acc + 1 : acc),
		0
	);
	if (zeros > input.length / 2) return '0';
	if (zeros === input.length / 2) return favor;
	return '1';
}

function filterMostCommonAt(
	input: Array<string>,
	position: number
): Array<string> {
	const mostCommonDigit = mostCommon(input, position, '1');
	return input.filter((v) => v[position] === mostCommonDigit);
}

function filterLessCommonAt(
	input: Array<string>,
	position: number
): Array<string> {
	const lessCommonDigit = mostCommon(input, position, '1') === '0' ? '1' : '0';
	return input.filter((v) => v[position] === lessCommonDigit);
}

function part1(input: Array<string>) {
	let gammaRate = '';
	const numberLength = input[0].length;
	for (let i = 0; i < numberLength; i++) {
		gammaRate += mostCommon(input, i);
	}
	const epsilonRate = gammaRate
		.split('')
		.map((v) => (v === '0' ? '1' : '0'))
		.join('');
	return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

function part2(input: Array<string>) {
	let oxygenGeneratorRating = [...input];
	let position = 0;
	while (oxygenGeneratorRating.length > 1) {
		oxygenGeneratorRating = filterMostCommonAt(oxygenGeneratorRating, position);
		position++;
	}

	let co2ScrubberRating = [...input];
	position = 0;
	while (co2ScrubberRating.length > 1) {
		co2ScrubberRating = filterLessCommonAt(co2ScrubberRating, position);
		position++;
	}
	return (
		parseInt(oxygenGeneratorRating[0], 2) * parseInt(co2ScrubberRating[0], 2)
	);
}

export { part1, part2 };
