'use strict';

function* genTest() {
  let x = 0;
  console.log('start');
  yield ++x;
  console.log(x);
  yield ++x;
  console.log(x);
  yield ++x;
  console.log(x);
  console.log('end');
  yield x;
}

const gen = genTest();

gen.next();
gen.next();
gen.next();
console.log(gen.return(5));
