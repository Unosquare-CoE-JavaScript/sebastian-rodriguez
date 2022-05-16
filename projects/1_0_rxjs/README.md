# RxJs

- [RxJs](#rxjs)
  - [Project](#project)
  - [First Example](#first-example)
  - [Purity](#purity)
  - [Observables](#observables)
    - [Pull vs Push](#pull-vs-push)
  - [Operators](#operators)
    - [Combination](#combination)
      - [combineLatest](#combinelatest)
      - [concat](#concat)
      - [merge](#merge)
      - [mergeAll](#mergeall)
      - [zip](#zip)
    - [Creation](#creation)
      - [EMPTY](#empty)
      - [of](#of)
      - [from](#from)
      - [fromEvent](#fromevent)
      - [Interval](#interval)
      - [Range](#range)
    - [Transformation](#transformation)
      - [exhaustMap](#exhaustmap)
      - [switchMap](#switchmap)

## Project

RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the **Observable**, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array methods (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

> Think of RxJS as Lodash for events.

ReactiveX combines the **Observer pattern** with the **Iterator pattern** and **functional programming** with collections to fill the need for an ideal way of managing sequences of events.

The essential concepts in RxJS which solve async event management are:

- Observable: represents the idea of an invokable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- *Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
- Subject: is equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

## First Example

JS way: Normally you register event listeners.

```javascript
document.addEventListener('click', () => console.log('Clicked!'));
```

Using RxJS you create an observable instead.

```javascript
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('Clicked!'));
```

## Purity

What makes RxJS powerful is its ability to produce values using pure functions. That means your code is less prone to errors.

Normally you would create an impure function, where other pieces of your code can mess up your state.

```javascript
let count = 0;
document.addEventListener('click', () => console.log(`Clicked ${++count} times`));
```

Using RxJS you isolate the state.

```javascript
import { fromEvent, scan } from 'rxjs';

fromEvent(document, 'click')
  .pipe(scan((count) => count + 1, 0))
  .subscribe((count) => console.log(`Clicked ${count} times`));
```

The scan operator works just like reduce for arrays. It takes a value which is exposed to a callback. The returned value of the callback will then become the next value exposed the next time the callback runs.

## Observables

Observables are lazy Push collections of multiple values. They fill the missing spot in the following table:

|              | SINGLE    | MULTIPLE    |
|--------------|-----------|-------------|
| **Pull**     | Function  | Iterator    |
| **Push**     | Promise   | Observable  |

### Pull vs Push

Pull and Push are two different protocols that describe how a data Producer can communicate with a data Consumer.

**What is Pull?** In Pull systems, the Consumer determines when it receives data from the data Producer. The Producer itself is unaware of when the data will be delivered to the Consumer.

**Every JavaScript Function is a Pull system.** The function is a Producer of data, and the code that calls the function is consuming it by "pulling" out a single return value from its call.

ES2015 introduced generator functions and iterators (function*), another type of Pull system. Code that calls iterator.next() is the Consumer, "pulling" out multiple values from the iterator (the Producer).

|        |             PRODUCER                     |          	CONSUMER                        |
|--------|------------------------------------------|-------------------------------------------|
|  Pull  |	Passive: produces data when requested.  |	Active: decides when data is requested.   |
|  Push	 |  Active: produces data at its own pace.  |	Passive: reacts to received data.         |

**What is Push?** In Push systems, the Producer determines when to send data to the Consumer. The Consumer is unaware of when it will receive that data.

Promises are the most common type of Push system in JavaScript today. A Promise (the Producer) delivers a resolved value to registered callbacks (the Consumers), but unlike functions, it is the Promise which is in charge of determining precisely when that value is "pushed" to the callbacks.

RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).

A Function is a lazily evaluated computation that synchronously returns a single value on invocation.
A generator is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
A Promise is a computation that may (or may not) eventually return a single value.
An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.

## Operators

RxJS is mostly useful for its operators, even though the Observable is the foundation. Operators are the essential pieces that allow complex asynchronous code to be easily composed in a declarative manner.

Operators are **functions**. There are two kinds of operators:

**Pipeable Operators** are the kind that can be piped to Observables using the syntax observableInstance.pipe(operator()). These include, filter(...), and mergeMap(...). When called, they do not change the existing Observable instance. Instead, they return a new Observable, whose subscription logic is based on the first Observable.

> A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.

A Pipeable Operator is essentially a pure function which takes one Observable as input and generates another Observable as output. Subscribing to the output Observable will also subscribe to the input Observable.

```javascript
import { of, map } from 'rxjs';

of(1, 2, 3)
  .pipe(map((x) => x * x))
  .subscribe((v) => console.log(`value: ${v}`));

// Logs:
// value: 1
// value: 4
// value: 9
```

### Combination

The combination operators allow the joining of information from multiple observables. Order, time, and structure of emitted values is the primary variation among these operators.

#### combineLatest

When any observable emits a value, emit the last emitted value from each.

This operator is best used when you have multiple, long-lived observables that rely on each other for some calculation or determination.

Be aware that **`combineLatest` will not emit an initial value until each observable emits at least one value.**

> Lastly, if you are working with observables that only emit one value, or you only require the last value of each before completion, forkJoin is likely a better option.

#### concat

Subscribe to observables in order as previous completes

- You can think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!
- If throughput, not order, is a primary concern, try merge instead!

#### merge

Turn multiple observables into a single observable.

- This operator can be used as either a static or instance method!
- If order not throughput is a primary concern, try concat instead!

#### mergeAll

Collect and subscribe to all observables.

- In many cases you can use mergeMap as a single operator instead!

#### zip

After all observables emit, emit values as an array

- Combined with interval or timer, zip can be used to time output from another source!

### Creation

These operators allow the creation of an observable from nearly anything. From generic to specific use-cases you are free, and encouraged, to turn everything into a stream.

#### EMPTY

A simple Observable that emits no items to the Observer and immediately emits a complete notification.

#### of

Emit variable amount of values in a sequence and then emits a complete notification.

#### from

Turn an array, promise, or iterable into an observable.

- This operator can be used to convert a promise to an observable!
- For arrays and iterables, all contained values will be emitted as a sequence!
- This operator can also be used to emit a string as a sequence of characters!

#### fromEvent

Turn event into observable sequence.

#### Interval

Emit numbers in sequence based on provided timeframe.

#### Range

Emit numbers in provided range in sequence.

### Transformation

Transforming values as they pass through the operator chain is a common task. These operators provide transformation techniques for nearly any use-case you will encounter.

#### exhaustMap

Map to inner observable, ignore other values until that observable completes.

#### switchMap

Map to observable, complete previous inner observable, emit values.
💡 If you would like more than one inner subscription to be maintained, try mergeMap!
💡 This operator is generally considered a safer default to mergeMap!
💡 This operator can cancel in-flight network requests!

##### Why use switchMap?

The main difference between switchMap and other flattening operators is the cancelling effect. On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed. You can remember this by the phrase switch to a new observable.
This works perfectly for scenarios like typeaheads where you are no longer concerned with the response of the previous request when a new input arrives. This also is a safe option in situations where a long lived inner observable could cause memory leaks, for instance if you used mergeMap with an interval and forgot to properly dispose of inner subscriptions. Remember, switchMap maintains only one inner subscription at a time, this can be seen clearly in the first example.
Be careful though, you probably want to avoid switchMap in scenarios where every request needs to complete, think writes to a database. switchMap could cancel a request if the source emits quickly enough. In these scenarios mergeMap is the correct option.