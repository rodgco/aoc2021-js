/**
 * Moving away from the initial tought of processing the
 * array, lanternFish by lanternFish, took some inspiration
 * from other implementations and decided to work on the
 * aggregate, with an array of 8 positions with the count
 * of lanterFishes at that stage. Much faster!!!
 */

function parseInput(input: Array<string>): Array<number> {
	return input[0]
		.split(',')
		.map(Number)
		.reduce(
			(acc, value) => {
				acc[value] += 1;
				return acc;
			},
			Array.from({ length: 9 }, () => 0)
		);
}

function cycle(lanternFishes: Array<number>, days: number) {
	for (let i = 0; i < days; i++) {
		// while each other number decreases by 1
		const zeros = lanternFishes.shift() || 0;
		// Each day, a 0 becomes a 6
		lanternFishes[6] += zeros;
		// and adds a new 8 to the end of the list
		lanternFishes.push(zeros);
	}
	return lanternFishes.reduce((acc, value) => acc + value);
}

function part1(input: Array<string>) {
	const lanternFishes = parseInput(input);
	return cycle(lanternFishes, 80);
}

function part2(input: Array<string>) {
	const lanternFishes = parseInput(input);
	return cycle(lanternFishes, 256);
}

export { part1, part2 };
