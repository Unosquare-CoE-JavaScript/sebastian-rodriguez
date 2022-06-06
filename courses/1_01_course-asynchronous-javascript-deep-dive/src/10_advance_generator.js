'use strict';

let obj = {
  1: 'one',
  2: 'two',
  3: 'three',
};

obj[Symbol.iterator] = function* () {
  // Iterates no matter how many elements the objects includes
  for (let index = 0; index < Object.keys(this).length; index++) {
    yield this[i];
  }
};

for (let item in obj) {
  console.log(item);
}

// Add item
obj[4] = 'four';

for (let item in obj) {
  console.log(item);
}
