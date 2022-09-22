# Multithreaded Javascript

## Chapter 1. Introduction

- First computers only runs one program at a time
- 'Second' generation use *cooperative multitasking* when the developers decide when stop and yield the program
- At the end we use a *preemptive multitasking* when the OS decides when stops and switch programs for execution.

### Threads

- Units of execution
- Process > Threads
- A process is a reserved memory and space for a program
- A process can spawn other process or threads
- Threads are more lightweight than processes
- A thread is just like a process , except that it shares memory space with the process that it belongs to
- A process can have many threads
- A typical way to take advantage of threads is to offload CPU-intensive work to an additional thread or pool of threads while the main thread is free to interact externally
- In order for threads to be useful, they need to be able to coordinate with each other.

### Concurrency vs Parallelism

**Concurrency:** Task are run in averlapping time
**Parallelism:** Tasks are run at exactly the same time

- For parallelism, they are running at *exactly the same time*. This means they must be running on separate CPU cores
- Parallelism is a subset of concurrency
- Threads do not automatically provide parallelism. The system hardware and software do.
- The javascript interpreter is only executing one instruction at any given time
- Modern JS engines like V8  use separate threads to handle garbage collection other features that don't need to happen in line with JS execution.
- **You should never assume that just because JS is single-threaded that only onw thread will be used by your JS application.**
- Many of the native addons in the Node.js ecosystem spawn threads of threads of their own.
- We need to ensure that some events are properly synchronized so that weird errors don’t occur.
- When adding threads to your code in any language, it’s worth making sure that the use is appropriate. Also, as with any exercise in attempting to make faster programs, always be measuring. You don’t want to have the complexity of threaded code in your application if it doesn’t turn out to give you any actual benefit.
- Any programming language supporting threads is going to provide some mechanisms for creating and destroying threads, passing messages in between, and interacting with data that’s shared between the threads.

## Chapter 2. Browsers

- Javascript have many different implementations and not every engine implements JS the same way.

### Dedidated Workers

- Web workers allow u to spawn a new environment for executing Javascript.
  - Communication occurs using a patter called *message passing*
- Web workers can even spawn new web workers

### Shared Workers

- Hard to debug
- Not fully implemented (Safari don't enable it)
- Should be named and have multiple instances of the same shared workers

### Service Worker

- A service worker functions as a sort of proxy that sits
between one or more web pages running in the browser
and the server.
- A service worker isn’t associated
with just a single web page but potentially multiple pages,
it’s more similar to a shared worker than to a dedicated
worker.
- **A service worker can exist and run in
the background even when a page isn’t necessarily still
open.**
- Service workers are primarily intended for performing
cache management of a website or a single page
application. They are most commonly invoked when
network requests are sent to the server, wherein an event
handler inside the service worker intercepts the network
request.
- **The service worker’s claim to fame is that it can be
used to return cached assets when a browser displays a
web page but the computer it’s running on no longer has
network access.**
- Browsers will only allow service workers to run on
a web page that has been served using the HTTPS protocol.
- Service workers are intended to only be used for
performing asynchronous operations.
- It’s also possible to pass messages into, andreceive messages from, a service worker.

#### CROSS-DOCUMENT COMMUNICATION

- Iframes
- Pop-up window
- BroadcastChannel API -> Pub/Sub Approach

### Message Passing Abstractions

- Each of the web workers covered in this chapter expose an
interface for passing messages into, and receiving
messages from, a separate JavaScript environment. This
allows you to build applications that are capable of running
JavaScript simultaneously across multiple cores.

#### The RPC Pattern

- The way to send multiple messages to a worker to do multiple things and get the answers in a correct way though IDs
  - A inplementation can be the JSON-RPC

#### The Command Dispatcher Pattern

- While the RPC pattern is useful for defining protocols, it
doesn’t necessarily provide a mechanism for determining
what code path to execute on the receiving end.
- The command dispatcher pattern solves this, providing a way to
take a serialized command, find the appropriate function,
and then execute it, optionally passing in arguments.

## Chapter 3. Node.js

- Prior to threads being available in Node.js, if you wanted to
take advantage of CPU cores, you needed to use processes.

### The worker_threads Module

- Node.js’s support for threads is in a built-in module called
worker_threads. It provides an interface to threads that
mimics a lot of what you’d find in web browsers for webworkers.
- You can have memory that’s shared between threads via
SharedArrayBuffer.

#### MessagePort

- A MessagePort is one end of a two-way data stream. By
default, one is provided to every worker thread to provide a
communication channel to and from the main thread. It’s
available in the worker thread as the parentPort property
of the worker_threads module.

### Worker Pools with Piscina

- The concept of pooled resources isn’t unique to threads. For
example, web browsers typically create pools of socket connections to web servers so that they can multiplex all the various HTTP requests required to render a web page across those connections. Database client libraries often do a similar thing with sockets connected to the database server.
- For the use case of discrete tasks sent to a pool of worker
threads, we have the piscina module at our disposal. This
module encapsulates the work of setting up a bunch of
worker threads and allocating tasks to them. The name of
the module comes from the Italian word for "pool."
- All programming is about trade-offs. Multithreaded
programming is no exception. In fact, you’ll find tradeoffs at every turn. Sacrificing convenience in one place will often give you performance gains elsewhere, or viceversa. Sometimes if one operation is slightly slower, another will be significantly faster.
