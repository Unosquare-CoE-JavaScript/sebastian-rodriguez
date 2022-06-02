/* ----------------------------------------- /*
 * First Example
 * ----------------------------------------- */

import { of, concat, EMPTY, delay, startWith } from 'rxjs';

concat(
  of(1, 2, 3),
  // subscribed after first completes
  of(4, 5, 6),
  // subscribed after second completes
  of(7, 8, 9)
).subscribe(console.log);
// log: 1, 2, 3, 4, 5, 6, 7, 8, 9

/* ----------------------------------------- /*
 * Second Example
 * ----------------------------------------- */

// elems
const userMessage = document.getElementById('message');
// helper
const delayedMessage = (message: string | number, delayedTime = 1000) => {
  return EMPTY.pipe(startWith(message), delay(delayedTime));
};

concat(
  delayedMessage('Get Ready!'),
  delayedMessage(3),
  delayedMessage(2),
  delayedMessage(1),
  delayedMessage('Go!'),
  delayedMessage('', 2000)
).subscribe((message: any) =>
  userMessage ? (userMessage.innerHTML = message) : null
);
