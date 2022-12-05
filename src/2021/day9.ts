const TEST = [
	'2199943210',
	'3987894921',
	'9856789892',
	'8767896789',
	'9899965678'
];

function parseInput(input: Array<string>) {
	return {
		width: input[0].length,
		length: input.length,
		heightMap: input.map((v) => v.split('').map(Number)),
		basin: [],
		basins: []
	};
}

interface Map {
	width: number;
	length: number;
	heightMap: Array<Array<number>>;
	basin: Array<Array<number>>;
	basins: Array<number>;
}

function part1(input: Array<string>) {
	const map = parseInput(input);
	let result = 0;
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map.width; x++) {
			const current = map.heightMap[y][x];
			const top = y > 0 ? map.heightMap[y - 1][x] : 10;
			const bottom = y < map.length - 1 ? map.heightMap[y + 1][x] : 10;
			const left = x > 0 ? map.heightMap[y][x - 1] : 10;
			const right = x < map.width - 1 ? map.heightMap[y][x + 1] : 10;
			if (
				current < top &&
				current < bottom &&
				current < left &&
				current < right
			) {
				result += 1 + current;
			}
		}
	}
	return result;
}

function buildBasin(
	map: Required<Map>,
	x: number,
	y: number,
	create: boolean = false
) {
	if (x < 0 || y < 0 || x >= map.width || y >= map.length) return map;
	if (map.heightMap[y][x] === 9 || map.basin[y][x] > 0) {
		return map;
	}
	if (create) map.basins.push(0);
	map.basins[map.basins.length - 1] += 1;
	map.basin[y][x] = map.basins.length;
	buildBasin(map, x + 1, y);
	buildBasin(map, x, y + 1);
	buildBasin(map, x - 1, y);
	buildBasin(map, x, y - 1);
}
function part2(input: Array<string>) {
	const map = <Map>parseInput(input);
	map.basin = Array.from({ length: map.length }, () =>
		Array.from({ length: map.width }, () => 0)
	);
	for (let y = 0; y < map.length; y++) {
		for (let x = 0; x < map.width; x++) {
			buildBasin(<Required<Map>>map, x, y, true);
		}
	}
	map.basins.sort((a, b) => b - a);
	return map.basins[0] * map.basins[1] * map.basins[2];
}

export { part1, part2 };
