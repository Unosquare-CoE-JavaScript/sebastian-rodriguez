import { Observable } from 'rxjs';

/* ------------------------------------------------- */
/* Basic Observable                                  */
/* ------------------------------------------------- */

class ObsManager {
  next: any;
  error: any;
  complete: any;

  constructor(nextFn, errFn, completeFn) {
    this.next = nextFn;
    this.error = errFn;
    this.complete = completeFn;
  }
}

const observable = new Observable((observer) => {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

// const manageObs = {
//   next: (value) => {
//     console.log(value);
//   },
//   error: (error) => {
//     console.log(error);
//   },
//   complete: () => {
//     console.log('completed');
//   },
// };

// console.log('manageObs', manageObs);

const nextManager = (value) => {
  console.log(value);
};

const errManage = (error) => {
  console.log(error);
};

const completeManage = () => {
  console.log('completed');
};

const newManager = new ObsManager(nextManager, errManage, completeManage);
console.log('newManage', newManager);

// observable.subscribe(newManager);

/* ------------------------------------------------- */
/* Observables as generalizations of functions       */
/* ------------------------------------------------- */

// Function version

function foo(): number {
  console.log('Hello');
  return 42;
}

const x = foo();
console.log('x', x);
const y = foo();
console.log('y', y);

// RxJs version

const fooObs = new Observable<number>((observer) => {
  console.log('Hello');
  observer.next(42);
});

const x$ = fooObs.subscribe((value) => {
  console.log('x$', value);
});

const y$ = fooObs.subscribe((value) => {
  console.log('y$', value);
});
