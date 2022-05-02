# Concurrent Programming With Go

## Concurrency and Parallelis

- Single task - have a single task
- Concurrency - have multiple tasks to execute in any order
- Parallellism - execute multiple tasks simultaneously

## Goroutines

- Enable concurrent programming

### Thread vs Goroutines

- Thread:
  - Have own execution stack
  - Fixed stack space (around 1 MB)
  - Managed by OS
- Goroutine
  - Have own execution stack
  - Variable stack space (start @2 KB)
  - Managed by Go runtime

## The sync package

- Allow goroutines to coordinate their work

### Overview

"Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the Once and WaitGroup types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

Values containing the types defined in this package should not be copied."

### Challenges with Concurrency

- Coordinating Tasks -> WaitGroups - Channels
- Shared Memory -> Mutexes - Channels

### sync.WaitGroup

A WaitGroup waits for a collection of goroutines to finish

### sync.Mutex

A *mut*ual *ex*clusion lock and protect memory access

## Channels

- Provide a safe way for goroutines to communicate

"Don't communicate by sharing memory, share memory by communication" - Rob Pike

```go
// create a channel
ch := make(chan int)

// create a buffered channel
ch := make(chan int, 5)
```

### Channel Types

- Bidirectional channel -> Default
- Send-only channel
- Receive-only channel

```go
ch := make(chan int)

// Bidirectional
func myFunction(ch chan int) {...}

// Send-only channel
func myFunction(ch chan<- int) {...}

// Receive-only channel
func myFunction(ch <-chan int) {...}
```

### Closing Channels

- Closed via the built-in close function
- Cannot check for closed channel!
- Sending new message triggers a panic
- Receiving messages okay
  - If buffered, all buffered messages available
  - If unbuffered, or buffer empty, receive zero-value
- Use comma okay syntax to check

### Control Flow

- If statement
- For loops
- Select statements

#### Select Statement

```go
ch1 := make(chan int)
ch2 := make(chan string)

select {
  case i := <-ch1;
    ...
  case ch2 <- "hello":
    ...
  default:
    // use default case for non-blocking select
}
```