/* ----------------------------------------- /*
 * First Example
 * ----------------------------------------- */

import { combineLatest, timer } from 'rxjs';

// timerOne emits first value at 1s, then once every 4s
const timerOne$ = timer(1000, 4000);
// timerTwo emits first value at 2s, then once every 4s
const timerTwo$ = timer(2000, 4000);
// timerThree emits first value at 3s, then once every 4s
const timerThree$ = timer(3000, 4000);

combineLatest([timerOne$, timerTwo$, timerThree$]).subscribe(
  ([timer1, timer2, timer3]) => {
    /*
      Example:
      timerThree first tick: 'Timer One Latest: 0, Timer Two Latest: 0, Timer Three Latest: 0
      timerOne second tick: 'Timer One Latest: 1, Timer Two Latest: 0, Timer Three Latest: 0
      timerTwo second tick: 'Timer One Latest: 1, Timer Two Latest: 1, Timer Three Latest: 0
    */
    console.log(`timer1: ${timer1}, timer2: ${timer2}, timer3: ${timer3}`);
  }
);
