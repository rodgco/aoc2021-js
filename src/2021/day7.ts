const TEST = ['16,1,2,0,4,2,7,1,2,14'];

function parseInput(input: Array<string>): Array<number> {
	return input[0]
		.split(',')
		.map(Number)
		.sort((a, b) => a - b);
}

function part1(input: Array<string>): number {
	const numbers = parseInput(input);
	// Uses median to find the alignment location
	const middle = numbers[numbers.length / 2];

	const fuel = numbers.reduce(
		(fuel, position) => fuel + Math.abs(middle - position),
		0
	);
	return fuel;
}

function part2(input: Array<string>): number {
	const numbers = parseInput(input);
	// Uses average to find the alignment location
	const middle = Math.floor(
		numbers.reduce((a, c) => a + c, 0) / numbers.length
	);
	const fuel = numbers.reduce((fuel, position) => {
		const steps = Math.abs(middle - position);
		// Uses Aritmetic Progression to calculate consumption
		return fuel + (steps * (1 + steps)) / 2;
	}, 0);
	return fuel;
}

export { part1, part2 };
