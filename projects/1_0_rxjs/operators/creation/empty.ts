/* ----------------------------------------- /*
 * First Example
 * ----------------------------------------- */

import { EMPTY } from 'rxjs';

EMPTY.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Complete!'),
});

// Outputs
// Complete!

// to declare an empty observable, you can use the EMPTY constant
const empty$ = EMPTY;
