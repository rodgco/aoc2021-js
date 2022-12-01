import { cbParseInt } from '../lib/numbers';

function parseInput(input: Array<string>) {
	return input
		.map((l) => l.split(' -> '))
		.map((v) => v.map((c) => c.split(',').map(cbParseInt)));
}

function plotVector(
	diagram: Record<string, number>,
	vector: Array<Array<number>>
): Record<string, number> {}

function part1(input: Array<string>) {
	const vectors = parseInput(input);
	const diagram: Record<string, number> = {};
	for (const vector of vectors) {
		let [[x1, y1], [x2, y2]] = vector;
		if (x1 === x2) {
			if (y2 < y1) [y1, y2] = [y2, y1];
			for (let y = y1; y <= y2; y++) {
				const c = [x1, y].toString();
				diagram[c] = (diagram[c] || 0) + 1;
			}
		} else if (y1 === y2) {
			if (x2 < x1) [x1, x2] = [x2, x1];
			for (let x = x1; x <= x2; x++) {
				const c = [x, y1].toString();
				diagram[c] = (diagram[c] || 0) + 1;
			}
		}
	}

	let dangerous = 0;
	for (const point in diagram) {
		if (diagram[point] >= 2) dangerous += 1;
	}
	return dangerous;
}

function part2(input: Array<string>) {}

export { part1, part2 };
