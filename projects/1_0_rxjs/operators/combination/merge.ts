/* ----------------------------------------- /*
 * First Example
 * ----------------------------------------- */

import { interval, merge, map } from 'rxjs';

//emit every 2.5 seconds
const first = interval(2500);
//emit every 2 seconds
const second = interval(2000);
//emit every 1.5 seconds
const third = interval(1500);
//emit every 1 second
const fourth = interval(1000);

//emit outputs from one observable
const example = merge(
  first.pipe(map(() => 'FIRST!')),
  second.pipe(map(() => 'SECOND!')),
  third.pipe(map(() => 'THIRD')),
  fourth.pipe(map(() => 'FOURTH'))
);
//output: "FOURTH", "THIRD", "SECOND!", "FOURTH", "FIRST!", "THIRD", "FOURTH"
const subscribe = example.subscribe((val) => console.log(val));
