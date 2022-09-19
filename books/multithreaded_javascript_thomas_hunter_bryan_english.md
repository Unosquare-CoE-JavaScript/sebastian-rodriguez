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
- 