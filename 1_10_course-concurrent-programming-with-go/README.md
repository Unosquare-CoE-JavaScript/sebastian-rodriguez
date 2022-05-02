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