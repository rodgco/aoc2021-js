class Card {
	numbers: Array<number>;
	sum: number;
	rowCheck: Array<number>;
	colCheck: Array<number>;
	lastCall: number;

	constructor(numbers: Array<number>) {
		this.numbers = [...numbers];
		this.sum = numbers.reduce((a, n) => a + n, 0);
		this.rowCheck = Array(5).fill(0);
		this.colCheck = Array(5).fill(0);
		this.lastCall = 0;
	}

	call(number: number) {
		this.lastCall = number;
		for (let x = 0; x < 5; x++) {
			for (let y = 0; y < 5; y++) {
				const index = y + x * 5;
				if (this.numbers[index] === number) {
					this.rowCheck[x] += 1;
					this.colCheck[y] += 1;
					this.sum -= number;
				}
			}
		}
	}

	won(): boolean {
		return [...this.rowCheck, ...this.colCheck].reduce(
			(a, s) => a || s === 5,
			false
		);
	}

	score(): number {
		return this.sum * this.lastCall;
	}
}

interface Bingo {
	call: Array<number>;
	cards: Array<Card>;
}

function parseInput(input: Array<string>): Bingo {
	const bingo: Bingo = {
		call: input[0].split(',').map((v) => parseInt(v)),
		cards: []
	};

	const regexp = /(\d+)\s*/g;

	for (let i = 1; i < input.length; i += 6) {
		const numbers: Array<number> = [];
		for (let j = 1; j < 6; j++) {
			const rowNumbers = input[i + j].match(regexp) || [];
			numbers.push(...rowNumbers.map((v: string) => parseInt(v)));
		}
		const card = new Card(numbers);
		bingo.cards.push(card);
	}
	return bingo;
}

function part1(input: Array<string>) {
	const bingo = parseInput(input);
	for (let number of bingo.call) {
		for (let card of bingo.cards) {
			card.call(number);
			if (card.won()) return card.score();
		}
	}
}

function part2(input: Array<string>) {
	const bingo = parseInput(input);

	let lastWinningCard: Card | null = null;

	for (let number of bingo.call) {
		for (let card of bingo.cards) {
			if (!card.won()) {
				card.call(number);
				if (card.won()) {
					lastWinningCard = card;
				}
			}
		}
	}

	return lastWinningCard?.score() || 0;
}

export { part1, part2 };
