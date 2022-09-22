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

## Chapter 5. Advanced Shared Memory

- Although the basic operations provided by Atomics are convenient, you will often find yourself needing to perform more complex interactions with that data.

### Atomic Methods for Coordination

- As far as prior art goes, these methods are modeled after a feature available in the Linux kernel called the futex, which is short for fast userspace mutex.
- Mutex itself is short for mutual exclusion, which is when a single thread of execution gets exclusive access to a particular piece of data. A mutex can also be referred to as a lock, where one thread locks access to the data, does its thing, and then unlocks access, allowing another thread to then touch the data.
- A futex is built on two basic operations, one being “wait” and the other being “wake.”
- This blocking behavior might be a little shocking at first.
Locking an entire thread sounds a bit intense, and in many
cases it is.
- Multiple threadscan be frozen at the same time, each waiting to be notified. The count value then determines how many of them to awaken.

### Timing and Nondeterminism

- In order for an application to be correct it usually needs to behave in a deterministic fashion. The Atomics.notify() function accepts an argument count that contains the number of threads to wake up. The glaring question in this situation is which threads get woken up and in which order?
- Threads are woken up in FIFO (first in, first out) order, meaning the first thread that called Atomics.wait() is the first to be woken up, the second to call is the second to be woken up, and so on.
- Another thing to keep in mind is that the speed that it takes to initialize threads will also likely depend on the number of cores available on your computer.

### Atomics and Events

- Don’t use Atomics.wait() in the main thread.
- Designate which threads are CPU-heavy and use lots of Atomics calls and which threads are evented.
- Consider using simple “bridge” threads to wait and post messages where appropriate.

## Chapter 6. Multithreaded Patterns

- Just looking at such abstract and low-level APIs can make it difficult to see the big picture, or what these APIs can really be used for. It’s admittedly difficult to take these concepts and convert them into something that is genuinely useful for an application. That’s what this chapter is for.

### Thread Pool

- The thread pool is a very popular pattern that is used in most multithreaded applications in some form or another. Essentially, a thread pool is a collection of homogeneous worker threads that are each capable of carrying out CPU-intensive tasks that the application may depend on.
- This pattern might feel similar to distributed systems that you may have worked with in the past. For example, with a container orchestration platform, there’s usually a collection of machines that are each capable of running application containers. With such a system each machine might have different capabilities, such as running different operating systems or having different memory and CPU resources. When this happens, the orchestrator may assign points to each machine based on resources and applications, then consume said points. On the other hand, a thread pool is much simpler because each worker is capable of carrying out the same work and each thread is just as capable as the other since they’re all running on the same machine.

#### Pool Size

- There are essentially two types of programs: those that run in the background, like a system daemon process, which ideally shouldn’t consume that many resources, and programs that run in the foreground that any given user is more likely to be aware of, like a desktop application or a web server.
- The number of CPU cores available to the machine should be a determining factor for the number of threads—aka workers—an application should use.
- Typically, the size of a thread pool won’t need to dynamically change throughout the lifetime of an application. Usually there’s a reason the number of workers is chosen, and that reason doesn’t often change. That’s why you’ll work with a thread pool with a fixed size, dynamically chosen when the application launches.
- One thing to keep in mind is that with most operating systems there is not a direct correlation between a thread and a CPU core.
- Each time a CPU core switches focus between programs—or threads of a program—a small context shift overhead comes into play. Because of this, having too many threads compared to the number of CPU cores can cause a loss of performance. The constant context switching will actually make an application slower, so applications should attempt to reduce the number of threads clamoring for attention from the OS. However, having too few threads can then mean that an application takes too long to do its thing, resulting in a poor user experience or otherwise wasted hardware.
- Another thing to keep in mind is that if an application makes a thread pool with four workers, then the minimum number of threads that application is using is five because the main thread of the application also comes into play. There are also background threads to consider, like the libuv thread pool, a garbage collection thread if the JavaScript engine employs one, the thread used to render the browser chrome, and so on. All of these will affect the performance of the application.
- **The characteristics of the application itself will also affect the ideal size of a thread pool. Are you writing a cryptocurrency miner that does 99.9% of the work in each thread and almost no I/O and no work in the main thread? In that case using the number of available cores as the size of the thread pool might be OK. Or are you writing a video streaming and transcoding service that performs heavy CPU and heavy I/O? In that case, you may want to use the number of available cores minus two. You’ll need to perform benchmarks with your application to find the perfect number, but a reasonable starting point might be to use the number of available cores minus one and then tweak when necessary.**

#### Dispatch Strategies

- Round Robin
- Random
- Least busy

- Depending on the nature of your application, you may find that one of these strategies offers much better performance than the others. Again, benchmarking is your friend when it comes to measuring a given application’s performance.

### Mutex: A Basic Lock

- A mutually exclusive lock, or mutex, is a mechanism for controlling access to some shared data. It ensures that only one task may use that resource at any given time. Here, a task can mean any sort of concurrent task, but most often the concept is used when working with multiple threads, to avoid race conditions. A task acquires the lock in order to run code that accesses the shared data, and then releases the lock once it’s done. The code between the acquisition and the release is called the critical section. If a task attempts to acquire the lock while another task has it, that task will be blocked until the other task releases the lock.
- **SEMAPHORES:** The element in the shared array that we use to represent the state of being locked or unlocked is a trivial example of a semaphore. Semaphores are variables used to convey state information between threads. They indicate a count of a resource being used. In the case of a mutex, we limit this to 1, but semaphores in other scenarios may involve other limits for other purposes.

### Streaming Data with Ring Buffers

- A ring buffer is an implementation of a first-in-first-out (FIFO) queue, implemented using a pair of indices into an array of data in memory. Crucially, for efficiency, when data is inserted into the queue, it won’t ever move to another spot in memory. Instead, we move the indices around as data gets added to or removed from the queue. The array is treated as if one end is connected to the other, creating a ring of data. This means that if these indices are incremented past the end of the array, they’ll go back to the beginning.

### Actor Model

- With this model an actor is a primitive container that allows for executing code. An actor is capable of running logic, creating more actors, sending messages to other actors, and receiving messages.
- These actors communicate with the outside world by way of message passing; otherwise, they have their own isolated access to memory. An actor is a first-class citizen in the Erlang programming language, but it can certainly be emulated using JavaScript.
- The actor model is designed to allow computations to run in a highly parallelized manner without necessarily having to worry about where the code is running or even the protocol used to implement the communication. Really, it should be transparent to program code whether one actor communicates with another actor locally or remotely.

## Chapter 7. WebAssembly

- For the unaware, WebAssembly (often abbreviated as WASM) is
a binary-encoded instruction format that runs on a stackbased virtual machine.
- It’s designed with security in mind and runs in a sandbox where the only things it has access to are memory and functions provided by the host environment. The main motivation behind having such a thing in browsers and other JavaScript runtimes is to run the parts of your program that are performance-sensitive in an environment where execution can happen much faster than JavaScript.
- With SharedArrayBuffers, atomic operations, and web workers (or worker_threads in Node.js), we have enough to do the full suite of multithreaded programming tasks using WebAssembly.
- Hand-writing WebAssembly in WAT, while clearly possible, isn’t usually the easiest path to being productive and getting performance gains with it. It was designed to be a compile target for higher-level languages, and that’s where it really shines.

### Compiling C Programs to WebAssembly with Emscripten

- Since long before WebAssembly, Emscripten has been the go-to way to compile C and C++ programs for use in JavaScript environments. Today, it supports multithreaded C and C++ code using web workers in browsers and worker_threads in Node.js.

### Other WebAssembly Compilers

- Emscripten isn’t the only way to compile code to
WebAssembly. Indeed, WebAssembly was designed
primarily as a compile target, rather than as a generalpurpose language in its own right.

## Chapter 8. Analysis

- By and large the main reason to add workers to an application is to increase performance. But this trade-off comes with a cost of added complexity. The KISS principle, meaning “Keep It Simple, Stupid,” suggests that your applications should be so stupidly simple that anyone can quickly look at the code and get an understanding of it. Being able to read code after it has been written is of paramount importance and simply adding threads to a program without purpose is an absolute violation of KISS.
- There are absolutely good reasons to add threads to an application, and as long as you’re measuring performance and confirming that speed gains outweigh added maintenance costs, then you’ve found yourself a situation deserving of threads.

### When Not to Use

- Threading is not a magic bullet capable of solving an application’s performance problems. It is usually not the lowest-hanging fruit when it comes to performance, either,and should often be done as a final effort. This is particularly true in JavaScript, where multithreading isn’t as widely understood by the community as other languages. Adding threading support may require heavy changes to an application, which means your effort-to-performance gains will likely be higher if you first hunt down other code inefficiencies first.

#### Low Memory Constraints

- There is some additional memory overhead incurred when instantiating multiple threads in JavaScript. This is because the browser needs to allocate additional memory for the new JavaScript environment—this includes things like globals and APIs available to your code as well as under-the-hood memory used by the engine itself.
- There are two important variables here used to measure the memory usage of a program, both of them measured in kilobytes. The first here is VSZ, or virtual memory size, which is the memory the process can access including swapped memory, allocated memory, and even memory used by shared libraries (such as TLS). The next is RSS, or resident set size, which is the amount of physical memory currently being used by the process.

#### Low Core Count

- Your application will run slower in situations where it has fewer cores. This is especially true if the machine has a single core, and it can also be true if it has two cores. Even if you employ a thread pool in your application and scale the poolbased on the core count, the application will be slower if it creates a single worker thread.

#### Containers Versus Threads

- When it comes to writing server software, like with Node.js, the rule of thumb is that processes should scale horizontally.
- This is a fancy term meaning you should run multiple redundant versions of the program in an isolated manner —such as within a Docker container.
- Horizontal scaling benefits performance in a way that allows developers to fine-tune the performance of the whole fleet of applications.

### When to Use

- Embarrassingly parallel
- Heavy math
- MapReduce-friendly problems
- Graphics processing
