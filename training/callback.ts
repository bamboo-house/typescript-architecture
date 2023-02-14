const add = (v1: number, v2: number): number => {
  return v1 + v2;
};

const calculate = (
  v1: number,
  v2: number,
  callback: (a: number, b: number) => number
): number => {
  return callback(v1, v2);
};

const result = calculate(1, 2, add);
console.log(result);

const hello = (num: number, num2: number) => {
  console.log(`Hello ${num + num2}`);
};

setTimeout(hello, 1000, 6, 2);
