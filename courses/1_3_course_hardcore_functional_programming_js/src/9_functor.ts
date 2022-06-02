import {  } from 'ramda'

const Box = (x: any) => ({
  map: (f: any) => Box(f(x)),
  fold: (f: any) => f(x),
  inspect: () => `Box(${x})`,
});

const first = (xs: any[]) => xs[0];

const haldTheFirstLargeNumber = (numbers: number[]): string => {
  const found = numbers.filter((num: number) => num >= 20);
  const answer = first(found) / 2;
  return `The answer is ${answer}`;
};

const haldTheFirstLargeNumberSandboxed = (numbers: number[]): string =>
  Box(numbers)
    .map((numbers: number[]) => numbers.filter((num: number) => num >= 20))
    .map((found: number[]) => first(found) / 2)
    .fold((answer: number) => `The answer is ${answer}`);

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;

  it('should return the half of the first large number', () => {
    expect(haldTheFirstLargeNumber([1, 4, 50])).toEqual('The answer is 25');
  });

  it('should return the half of the first large number', () => {
    expect(haldTheFirstLargeNumberSandboxed([1, 4, 50])).toEqual(
      'The answer is 25'
    );
  });
}
