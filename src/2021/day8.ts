const TEST = [
	'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
	'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
	'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
	'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
	'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
	'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
	'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
	'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
	'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
	'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
];

function parseInput(input: Array<string>) {
	return input.map((v) => v.split(' | ').map((c) => c.split(' ')));
}

function part1(input: Array<string>) {
	const codes = parseInput(input);
	const count = codes.reduce((acc, value) => {
		return (
			acc +
			value[1]
				.map((v) => v.length)
				.reduce((acc2, v2) => {
					if (v2 === 2 || v2 === 4 || v2 === 3 || v2 === 7) acc2 += 1;
					return acc2;
				}, 0)
		);
	}, 0);
	return count;
}

function digitInDigit(digit: string, another: string) {
	let response = true;
	for (const letter of another) {
		response &&= digit.includes(letter);
	}
	return response;
}

function findDigit(digit: string, map: Array<string>) {
	return map.reduce((a1, d, i) => {
		if (digit.length !== d.length) return a1;
		if (digit.split('').reduce((a2, l) => a2 && d.includes(l), true)) return i;
		return a1;
	}, 0);
}

function findZero(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (
			digit.length === 6 &&
			digitInDigit(digit, map[1]) &&
			!digitInDigit(digit, map[9])
		)
			return digit;
	}
	return '';
}
function findOne(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 2) return digit;
	}
	return '';
}
function findTwo(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (!map.includes(digit)) return digit;
	}
	return '';
}
function findThree(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 5 && digitInDigit(digit, map[1])) return digit;
	}
	return '';
}
function findFour(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 4) return digit;
	}
	return '';
}
function findFive(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 5 && digit !== map[3] && digitInDigit(map[9], digit))
			return digit;
	}
	return '';
}
function findSix(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (
			digit.length === 6 &&
			!digitInDigit(digit, map[0]) &&
			!digitInDigit(digit, map[9])
		)
			return digit;
	}
	return '';
}
function findSeven(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 3) return digit;
	}
	return '';
}
function findEight(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 7) return digit;
	}
	return '';
}
function findNine(usp: Array<string>, map: Array<string>) {
	for (const digit of usp) {
		if (digit.length === 6 && digitInDigit(digit, map[3])) return digit;
	}
	return '';
}

function part2(input: Array<string>) {
	const codes = parseInput(input);
	let resultado = 0;
	for (const code of codes) {
		const [usp, fdov] = code;
		const map = Array.from({ length: 10 }, () => '');
		map[1] = findOne(usp, map);
		map[4] = findFour(usp, map);
		map[7] = findSeven(usp, map);
		map[8] = findEight(usp, map);
		map[3] = findThree(usp, map);
		map[9] = findNine(usp, map);
		map[0] = findZero(usp, map);
		map[6] = findSix(usp, map);
		map[5] = findFive(usp, map);
		map[2] = findTwo(usp, map);
		const digits = fdov.reduce((acc, digit, index) => {
			return acc + 10 ** (3 - index) * findDigit(digit, map);
		}, 0);
		resultado += digits;
	}
	return resultado;
}

export { part1, part2 };
