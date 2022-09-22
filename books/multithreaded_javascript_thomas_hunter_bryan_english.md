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

## Chapter 4. Shared Memory

- While it’s true they allow you to run code in parallel, you’ve only done so using message-passing APIs, ultimately depending on the familiar event loop to handle the receipt of a message.
- The Atomics object and the SharedArrayBuffer class allow you to share memory between two threads without depending on message passing.
- In the wrong hands, the tools covered here can be dangerous, introducing logic-defying bugs to your application that slither in the shadows during development only to rear their heads in production. But when honed and used properly, these tools allow your application to soar to new heights, squeezing never-before-seen levels of performance from your hardware.

### SharedArrayBuffer and TypedArrays

- Traditionally the JavaScript language didn’t really support interaction with binary data. Sure, there were strings, but they really abstracted the underlying data storage mechanism. There were also arrays, but those can contain values of any type and aren’t appropriate for representing binary buffers. For many years that was sort of “good enough,” especially before the advent of Node.js and the popularity of running JavaScript outside of a web page context took off.
- It allows applications to share memory across
threads.
- Just in case you haven’t had experience with it, binary is a system of counting that is 2 based, which at the lowest level is represented as 1s and 0s. Each of these numbers is referred to as a bit. Decimal, the system humans mostly use for counting, is 10 based and is represented with numerals from 0 to 9. A combination of 8 bits is referred to as a byte and is often the smallest addressable value in memory since it’s usually easier to deal with than individual bits. Basically, this means CPUs (and programmers) work with bytes instead of individual bits.
  - Given an arbitrary set of bytes that is stored on disk, or even in a computer’s memory, it’s a little ambiguous what the data means. For example, what might the hexadecimal value 0x54 (the 0x prefix in JavaScript means the value is in hexadecimal) represent? Well, if it’s part of a string, it might mean the capital letter T. However, if it represents an integer, it might mean the decimal number 84. It might even refer to a memory location, part of a pixel in a JPEG image, or any other number of things. The context here is very important. That same number, represented in binary, looks like 0b01010100 (the 0b prefix represents binary).
- Keeping this ambiguity in mind, it’s also important to mention that the contents of an ArrayBuffer (and SharedArrayBuffer) can’t be directly modified. Instead, a “view” into the buffer must first be created. Also, unlike other languages which might provide access to abandoned memory, when an ArrayBuffer in JavaScript is instantiated the contents of the buffer are initialized to 0. Considering these buffer objects only store numeric data, they truly are a very elementary tool for data storage, one that more complicated systems are often built upon.
- The term view has been mentioned in a few places, and now is a good time to define it. Due to the ambiguity of what binary data can mean, we need to use a view to read and write to the underlying buffer. There are several of these views available in JavaScript. Each of these views extends from a base class called TypedArray. This class can’t be instantiated directly and isn’t available as a global, but it can be accessed by grabbing the .prototype property from an instantiated child class.

### Atomic Methods for Data Manipulation

- Atomicity is a term that you might have heard before, particularly when it comes to databases, where it’s the first word in the acronym ACID (atomicity, consistency, isolation, durability).
- Essentially, if an operation is atomic, it means that while the overall operation may be composed of multiple smaller steps, the overall operation is guaranteed to either entirely succeed or entirely fail. For example, a single query sent to a database is going to be atomic, but three separate queries aren’t atomic.
  - if those three queries are wrapped in a database transaction, then the whole lot becomes atomic; either all three queries run successfully, or none run successfully. It’s also important that the operations are executed in a particular order, assuming they manipulate the same state or otherwise have any side effects than can affect each other. The isolation part means that other operations can’t run in the middle; for example, a read can’t occur when only some of the operations have been applied.
- JavaScript provides a global object named Atomics with several static methods available on it. This global follows the same pattern as the familiar Math global. In either case you can’t use the new operator to create a new instance, and the available methods are stateless, not affecting the global itself. Instead, with Atomics, they’re used by passing in a reference to the data that is to be modified.

### Atomicity Concerns

- Essentially, when using Atomics calls, there’s an implicit lock in place to make interactions convenient.
- Sadly, not all of the operations you’ll need to perform with shared memory can be
represented using the Atomics methods. When that happens you’ll need to come up with a more manual locking mechanism, allowing you to read and write freely and preventing other threads from doing so.

### Data Serialization

- Buffers are extremely powerful tools. That said, working with them from an entirely numeric point of view can start to get a little difficult. Sometimes you’ll need to store things that represent nonnumeric data using a buffer. When this happens you’ll need to serialize that data in some manner before writing it to the buffer, and you’ll later need to deserialize it when reading from the buffer.
- An API is available to modern JavaScript for encoding and decoding strings directly to ArrayBuffer instances. This API is provided by the globals TextEncoder and TextDecoder, both of which are constructors and are globally available in modern JavaScript environments including browsers and Node.js. These APIs encode and decode using the UTF-8 encoding due to its ubiquity.
- The performance trade-offs when communicating between threads is not usually due to the size of the payload being transferred, but is more than likely due to the cost of serializing and deserializing payloads.