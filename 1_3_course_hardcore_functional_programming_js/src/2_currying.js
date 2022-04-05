'use strict';

// The curry function takes a function and returns a function that takes a single argument.
const curry = (fn) => (x) => (y) => fn(x, y);

const modulo = curry((x, y) => y % x);
const isOdd = modulo(2);

// Always define the function in terms of the first parameter is known and the others are unknown
const filter = curry((fn, list) => list.filter(fn));
// The data happen last
const getOdds = filter(isOdd);

console.log(getOdds([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
