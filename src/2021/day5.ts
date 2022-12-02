import { cbParseInt } from '../lib/numbers';

function parseInput(input: Array<string>) {
	return input
		.map((l) => l.split(' -> '))
		.map((v) => v.map((c) => c.split(',').map(cbParseInt)));
}

class Diagram {
	diagram: Record<string, number>;

	constructor() {
		this.diagram = {};
	}

	plot(vector: Array<Array<number>>) {
		let [[x1, y1], [x2, y2]] = vector;
		const xSteps = x2 - x1;
		const ySteps = y2 - y1;

		for (let i = 0; i < Math.max(Math.abs(xSteps), Math.abs(ySteps)) + 1; i++) {
			const c = [
				x1 + i * Math.sign(xSteps),
				y1 + i * Math.sign(ySteps)
			].toString();
			this.diagram[c] = (this.diagram[c] || 0) + 1;
		}
		// if (x1 === x2) {
		// 	if (y2 < y1) [y1, y2] = [y2, y1];
		// 	for (let y = y1; y <= y2; y++) {
		// 		const c = [x1, y].toString();
		// 		this.diagram[c] = (this.diagram[c] || 0) + 1;
		// 	}
		// } else if (y1 === y2) {
		// 	if (x2 < x1) [x1, x2] = [x2, x1];
		// 	for (let x = x1; x <= x2; x++) {
		// 		const c = [x, y1].toString();
		// 		this.diagram[c] = (this.diagram[c] || 0) + 1;
		// 	}
		// }
	}

	count(): number {
		let dangerous = 0;
		for (const point in this.diagram) {
			if (this.diagram[point] >= 2) dangerous += 1;
		}
		return dangerous;
	}
}

function part1(input: Array<string>) {
	const vectors = parseInput(input);
	const diagram = new Diagram();
	for (const vector of vectors) {
		if (vector[0][0] === vector[1][0] || vector[0][1] === vector[1][1])
			diagram.plot(vector);
	}
	return diagram.count();
}

function part2(input: Array<string>) {
	const vectors = parseInput(input);
	const diagram = new Diagram();
	for (const vector of vectors) {
		diagram.plot(vector);
	}
	return diagram.count();
}

export { part1, part2 };
