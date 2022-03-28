- [Asynchronous Javascript Deep Dive](#asynchronous-javascript-deep-dive)
  - [Sync vs Async](#sync-vs-async)
    - [Sync Code](#sync-code)
      - [Adventages](#adventages)
      - [Disadventages](#disadventages)
    - [Async Code](#async-code)
      - [Adventages](#adventages-1)
      - [Disadventages](#disadventages-1)
  - [Event Loop](#event-loop)
  - [Glossary](#glossary)
    - [setTimeout()](#settimeout)
    - [Callback](#callback)

# Asynchronous Javascript Deep Dive

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

## Glossary

### setTimeout()

The global setTimeout() method sets a timer which executes a function or specified piece of code once the timer expires.

Basically what that does is it calls a function after a certain amount of time. So when the time has expired then it will call that function to go ahead and execute. So set time out requires the first parameter to be a function passed in an anonymous function that is going to be invoked and the second parameter it's the time javascript will wait to resolve the callback*.

```
var timeoutID = setTimeout(function[, delay]);
```

### Callback

A callback function is one that is passed as an argument to another function to be "called again" (call back) at a later time. A function that accepts other functions as arguments is called a High-Order function, and it contains the logic to determine when the callback function is executed. It is the combination of these two that allows us to extend our functionality.


