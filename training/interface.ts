const STONE = 0;
const PAPER = 1;
const SCISSORS = 2;

interface HandGenerator {
  generate(): number;
}

class RandomHandGenerator implements HandGenerator {
  generate(): number {
    return Math.floor(Math.random() * 3);
  }

  generateArray(): number[] {
    return [];
  }
}

class StoneHandGenerator implements HandGenerator {
  generate(): number {
    return STONE;
  }
}

class Janken {
  play(handGenerator: HandGenerator) {
    const computeHand = handGenerator.generate();

    console.log(`computerHand = ${computeHand}`);
  }
}

const janken = new Janken();
const generate = new RandomHandGenerator();
janken.play(generate);

const generate2 = new StoneHandGenerator();
janken.play(generate2);
