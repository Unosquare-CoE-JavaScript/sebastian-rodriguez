# Asynchronous Javascript Deep Dive

- [Asynchronous Javascript Deep Dive](#asynchronous-javascript-deep-dive)
  - [Sync vs Async](#sync-vs-async)
    - [Sync Code](#sync-code)
      - [Adventages](#adventages)
      - [Disadventages](#disadventages)
    - [Async Code](#async-code)
      - [Adventages](#adventages-1)
      - [Disadventages](#disadventages-1)
  - [Event Loop](#event-loop)
  - [Callback](#callback)
    - [Problems with callbacks](#problems-with-callbacks)
  - [Promises](#promises)
    - [then()](#then)
    - [catch()](#catch)
    - [finally()](#finally)
    - [Promise.all()](#promiseall)
    - [Promise.race()](#promiserace)
    - [Promise.allSettled()](#promiseallsettled)
    - [Promise.any()](#promiseany)
  - [Async - Await](#async---await)
    - [Await](#await)
    - [try/catch](#trycatch)
  - [Generator](#generator)
  - [Glossary](#glossary)
    - [setTimeout()](#settimeout)
    - [Macrotasks](#macrotasks)
    - [Microtask](#microtask)
    - [Fetch API](#fetch-api)
    - [Module Pattern](#module-pattern)
      - [Adventages](#adventages-2)

## Sync vs Async

### Sync Code

Synchronous code is what is written by default. The reason being it is easy to understand. Basically the way synchronous code works is one piece of code executes and must finish before the next piece of code can start and so it goes in order.

It is easy to follow. It must run in order and it blocks anything else from happening while it is running. If you write sync code and you have a heavy task computation that will take some time all the program execution will be frozen until the heavy task ends and the execution continues.

#### Adventages

- Easy to write and to reason about

#### Disadventages

- May create blocking code
- Less performant

### Async Code

In the other hand, the async code enabled the possibility of write code that don't block the main threat. Writing async code the program can make and wait many thing at the same time.

#### Adventages

- Very performant
- Eliminates code blocking

#### Disadventages

- It can be difficult to reason about
- Harder to write

## Event Loop

In order for JavaScript to achieve asynchronous coding it makes use of callbacks. The environment performs an operation like set time out providing a callback function and then moves on to do something else.

When the operation has been completed a message is queued along with the provide a callback function. At some point in the future the message is decoded and the callback is fired the event loop is important in making this happen.

The event loop continuously checks for queued messages and takes care of the next one in line.

Instead of waiting for something to finish we are doing other things at the same time and the event loop makes sure that we still come back and visit those things that have been queued that need to be taken care of.

## Callback

A callback function is one that is passed as an argument to another function to be "called again" (call back) at a later time. A function that accepts other functions as arguments is called a High-Order function, and it contains the logic to determine when the callback function is executed. It is the combination of these two that allows us to extend our functionality.

The callback pattern is such an important pattern in JavaScript. Traditionally it was the only way to achieve asynchronous coding in JavaScript. Today we have additional patterns in promises and async await. But even those rely on callbacks.

### Problems with callbacks

- Callback Hell
- Dificult to reason about
- Inversion of Control

## Promises

***Definition:*** The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

Promises provide a powerful async pattern in JavaScript and resolve some problems of callbacks. Promise is an object with *properties* and *methods*. So we now have an object that represents something is going to happen in the future something that will be completed in the future and when this future event occurs a value is provided, **so promise will always provide a value.**

### then()

The .then() method takes up to two arguments; the first argument is a callback function for the resolved case of the promise, and the second argument is a callback function for the rejected case. Each .then() returns a newly generated promise object, which can optionally be used for chaining; for example:

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo');
  }, 300);
});

myPromise
  .then(handleResolvedA, handleRejectedA)
  .then(handleResolvedB, handleRejectedB)
  .then(handleResolvedC, handleRejectedC);
```

### catch()

A .catch() is really just a .then() without a slot for a callback function for the case when the promise is resolved. The catch() method returns a Promise and deals with rejected cases only. It behaves the same as calling ***Promise.prototype.then(undefined, onRejected)*** (in fact, calling ***obj.catch(onRejected)*** internally calls ***obj.then(undefined, onRejected))***.

```javascript
const promise1 = new Promise((resolve, reject) => {
  throw 'Uh-oh!';
});

promise1.catch((error) => {
  console.error(error);
});
// expected output: Uh-oh!
```

### finally()

The finally() method returns a Promise. When the promise is finally either fulfilled or rejected, the specified callback function is executed. This provides a way for code to be run whether the promise was fulfilled successfully, or instead rejected.

This helps to avoid duplicating code in both the promise's then() and catch() handlers.

```javascript
function checkMail() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Mail has arrived');
    } else {
      reject(new Error('Failed to arrive'));
    }
  });
}

checkMail()
  .then((mail) => {
    console.log(mail);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
    console.log('Experiment completed');
  });
```

### Promise.all()

The ***Promise.all()*** static method allows you to enter several promises in the form of an array. So inside of the parentheses here we would pass enter in an array and that array would consist of promises.

The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

### Promise.race()

The ***Promise.race()*** static method is basically a race. It's literally a race. Hence only the first promise that is resolved wins all the others are ignored so if you're waiting for several promises but you only need one of them.

Then, the ***Promise.race()*** method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

### Promise.allSettled()

The Promise.allSettled() method returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

It is typically used when you have multiple asynchronous tasks that are not dependent on one another to complete successfully, or you'd always like to know the result of each promise.

In comparison, the Promise returned by Promise.all() may be more appropriate if the tasks are dependent on each other / if you'd like to immediately reject upon any of them rejecting.

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"
```

### Promise.any()

Promise.any() takes an iterable of Promise objects. It returns a single promise that resolves as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

Unlike Promise.race(), which returns the first settled value (either fulfillment or rejection), this method returns the first fulfilled value. This method will ignore all rejected promises up until the first promise that fulfills.

## Async - Await

There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. The async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains.

### Await

Async functions can contain zero or more await expressions. Await expressions make promise-returning functions behave as though they're synchronous by suspending execution until the returned promise is fulfilled or rejected. The resolved value of the promise is treated as the return value of the await expression. Use of async and await enables the use of ordinary try / catch blocks around asynchronous code.

### try/catch

The try...catch statement marks a try block and a catch block. If the code in the try block throws an exception then the code in the catch block will be executed.

```javascript
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}

```

## Generator

Generators have been around longer than async await. Basically a generator is a way to write code that you can pause and then continue at a later time. So traditionally we use code that runs from start to finish. A generator is a function that we can use to cause the code to yield and the code won't continue until we tell it to at some later time. When you yield or pause the code it doesn't hold up code that may be elsewhere.

A more technical way to describe it is you start a generator function and then you can exit that function before it runs all the code. Later you can reenter that function at the point where you exited it is even possible that you do not want to continue the function at all or so it may not ever finish.

The generators allows you to define an iterative algorithm by writing a single function whose execution is not continuous. Generator functions are written using the function* syntax.

When called, generator functions do not initially execute their code. Instead, they return a special type of iterator, called a Generator. When a value is consumed by calling the generator's next method, the Generator function executes until it encounters the yield keyword.

The function can be called as many times as desired, and returns a new Generator each time. Each Generator may only be iterated once.

```javascript
function* generator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generator(); // "Generator { }"

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
```

## Glossary

### setTimeout()

The global setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.

Basically what that does is it calls a function after a certain amount of time. So when the time has expired then it will call that function to go ahead and execute. So set time out requires the first parameter to be a function passed in an anonymous function that is going to be invoked and the second parameter it's the time javascript will wait to resolve the callback*.

```javascript
var timeoutID = setTimeout(function[, delay]);
```

### Macrotasks

A task is any JavaScript code which is scheduled to be run by the standard mechanisms such as initially starting to run a program, an event callback being run, or an interval or timeout being fired. These all get scheduled on the task queue.

### Microtask

A microtask is a short function which is executed after the function or program which created it exits and only if the JavaScript execution stack is empty, but before returning control to the event loop being used by the user agent to drive the script's execution environment.

Microtask have more priority and javascript will try to resolve all microtasks before continue with the next task.

### Fetch API

The Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses. It also provides a global fetch() method that provides an easy, logical way to fetch resources asynchronously across the network.

Fetch is part of the ***window*** objec that it's only available in the browser. For other environments like node or workers you need other alternative like Axios

Example:

```javascript
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

```

### Module Pattern

[Reference](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch09s02.html)

The Module pattern was originally defined as a way to provide both private and public encapsulation for classes in conventional software engineering.

In JavaScript, the Module pattern is used to further emulate the concept of classes in such a way that we’re able to include both public/private methods and variables inside a single object, thus shielding particular parts from the global scope. What this results in is a reduction in the likelihood of our function names conflicting with other functions defined in additional scripts on the page.

The Module pattern encapsulates “privacy” state and organization using closures. It provides a way of wrapping a mix of public and private methods and variables, protecting pieces from leaking into the global scope and accidentally colliding with another developer’s interface. With this pattern, only a public API is returned, keeping everything else within the closure private.

```javascript
var testModule = (function () {

  var counter = 0;

  return {

    incrementCounter: function () {
      return ++counter;
    },

    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  };

})();

// Usage:

// Increment our counter
testModule.incrementCounter();

// Check the counter value and reset
// Outputs: 1
testModule.resetCounter();
```

#### Adventages

- Avoid Collisions (Namespace)
- Reusability
- Maintainability
