'use strict';

// Functions
const add = (x, y) => x + y;

const toPair =
  (fn) =>
  ([x, y]) =>
    fn(x, y);

const fromPair = (fn) => (x, y) => fn([x, y]);

const flip = (fn) => (x, y) => fn(y, x);

const curry = (fn) => (x) => (y) => fn(x, y);

const uncurry = (fn) => (x, y) => fn(x)(y);

// Executors
const result1 = toPair(add)([1, 2]);
const result2 = fromPair(toPair(add))(1, 2);
const result3 = flip(add)(1, 2);

const curriedAdd = curry(add);
const curriedIncrement = curriedAdd(1);
const curreidResult = curriedIncrement(2);

// Logs
console.log('toPair =>', result1);
console.log('fromPair =>', result2);
console.log('flip =>', result3);
console.log('curry =>', curreidResult);
