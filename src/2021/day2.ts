interface Movement {
	direction: 'forward' | 'down' | 'up';
	units: number;
}

function parseMovements(input: Array<string>): Array<Movement> {
	return input.map((v) => {
		const [direction, units] = v.split(' ');
		return <Movement>{ direction, units: parseInt(units) };
	});
}

function part1(input: Array<string>) {
	const movements = parseMovements(input);
	let horizontal = 0;
	let depth = 0;
	for (const movement of movements) {
		switch (movement.direction) {
			case 'forward':
				horizontal += movement.units;
				break;
			case 'down':
				depth += movement.units;
				break;
			case 'up':
				depth -= movement.units;
				break;
		}
	}
	return horizontal * depth;
}

function part2(input: Array<string>) {
	const movements = parseMovements(input);
	let horizontal = 0;
	let depth = 0;
	let aim = 0;
	for (const movement of movements) {
		switch (movement.direction) {
			case 'forward':
				horizontal += movement.units;
				depth += aim * movement.units;
				break;
			case 'down':
				aim += movement.units;
				break;
			case 'up':
				aim -= movement.units;
				break;
		}
	}
	return horizontal * depth;
}

export { part1, part2 };
