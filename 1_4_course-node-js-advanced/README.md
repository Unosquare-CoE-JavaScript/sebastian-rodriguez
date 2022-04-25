# Node.js Advanced Concepts

## Internals

```
 Js Code
    ▼
 Node.js
 ▼     ▼
V8   libuv
```

- **Node:** Contains the interface to comunicate to V8 and libuv through standard library modules
- **V8:** Enable run js code outside the browser
- **libuv:** Gives node access to the operating system

## Node.js => js - C++ Interop

```
    Javascript Code
          ▼
 Node's Javascript Side
(lib folder in Node repo)
          ▼
   process.binding()            <--- Connects JS and C++ function
          ▼
          V8                    <--- Converts values between JS and C++ world
          ▼
    Node's C++ Side
(src folder in Node Repo)
          ▼
        libuv                   <--- GIves Node easy access to underlying OS
```

## Threads

- Process is an instance of a computer program that is being executed. Within a single process we can have multiple things called threads. 
- A thread it's like a little todo list that has some numbers of instructions that need to be executed by the CPU of your computer. This thread is given to the CPU and the CPU will attempt to run every instruction on it one by one.
- Scheduling refers to your operating systems ability to decide which thread to process at given instant. The OS scheduler makes sure that urgent threads don't have to wait too long to be executed
- Node.js uses two kinds of threads: a main thread handled by the event loop and several auxiliary threads in the worker pool.

## Event Loop
It's used by node to handle asynchronous code inside applications. When node applications start up, the computer automatically creates one thread and then executes all of our code inside of that one single threat.

The event loop is like a control structure that decides what our one thread should be doing at any given point in time.

The event loop is the absolute core of every node program.

In Node.js, each iteration of an Event Loop is called a **tick**.

The event loop uses a single thread, but a lot of the code that you and I write doues not actually execute inside that thread entirely.

## Thread Pool

The thread pool is a series of four threads that can be used for running computationally intensive tasks. That means that in addition to the thread used for the event loop, there are four other threads that can be used to offload epensive calculations that need to occur inside of our application.

## Ways to improve node performance

- Use Node in 'Cluster' Mode  (?) Recommended
- Use Worker Threads          (?) Experimental

## Cluestering

```
               Cluster Manager
                      |
      +---------------+--------------+
      ▼               ▼              ▼
Single Thread   Single Thread  Single Thread
      ▼               ▼              ▼
 Node Server     Node Server    Node Server
```

The clustering launch multiple instances on the same machine.
