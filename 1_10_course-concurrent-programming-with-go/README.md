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

## Channels

- Provide a safe way for goroutines to communicate