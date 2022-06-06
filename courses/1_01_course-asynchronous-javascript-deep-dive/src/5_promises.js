'use strict';

const asyncFunction = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve('asyncFunction has resolved');
    }, 3000)
  );

const asyncFunction2 = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve('asyncFuntion2 is done.');
    }, 2000)
  );

// Promises use 101
const promise = asyncFunction();

promise.then((value) => console.log('Yeah! ==>', value));

const promise2 = promise.then(asyncFunction2);

promise2.then((value) => console.log('Second promise'));

// Consume promises in a chain way
const promise3 = promise
  .then(asyncFunction2)
  .then((value) => console.log('Third promise ==>', value));
