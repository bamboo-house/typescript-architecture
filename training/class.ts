class Fraction {
  constructor(private _numerator: number, private _denominator: number) {}

  toString(): string {
    return `${this._numerator}/${this._denominator}`;
  }

  get numerator() {
    return this._numerator;
  }

  get denominator() {
    return this._denominator;
  }
}

const f1 = new Fraction(1, 2);
console.log(f1.numerator);
console.log(f1.denominator);

const f2 = new Fraction(1, 3);
console.log(f2.toString());
