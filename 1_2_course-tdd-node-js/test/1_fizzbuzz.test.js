import { it, expect, describe } from 'vitest';

import { fizzBuzz } from '../src/1_fizzbuzz';

const checkFizzBuzz = (testValue, expectedValue) => {
  const result = fizzBuzz(testValue);
  expect(result).toEqual(expectedValue);
};

// Basic test
it('expects true', () => {
  expect(true).to.equal(true);
});

describe('FizzBuzz', () => {
  it('can call fizzBuzz', () => {
    fizzBuzz(1);
  });

  it('return 1 with 1 passed in', () => {
    checkFizzBuzz(1, 1);
  });

  it('return 2 with 2 passed in', () => {
    checkFizzBuzz(2, 2);
  });

  it('returns Fizz with 3 passed in', () => {
    checkFizzBuzz(3, 'Fizz');
  });
  it('returns Buzz with 5 passed in', () => {
    checkFizzBuzz(5, 'Buzz');
  });
  it('returns FizzBuzz with 15 passed in', () => {
    checkFizzBuzz(15, 'FizzBuzz');
  });
});
