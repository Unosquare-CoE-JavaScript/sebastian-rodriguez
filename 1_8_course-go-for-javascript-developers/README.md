# Go for Javacsript Developers

- [Go for Javacsript Developers](#go-for-javacsript-developers)
  - [Go History](#go-history)
  - [Go Features](#go-features)
  - [Go Motivation](#go-motivation)
  - [Go vs. Javascript](#go-vs-javascript)
  - [Language Features](#language-features)
    - [Printing](#printing)
    - [Types](#types)
    - [Control Structures](#control-structures)

## Go History

Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson.

## Go Features

It provides a rich standard library, garbage collection, and dynamic-typing capability. It is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.

- Lightweight type system
- Concurrency
- Automatic garbage collection
- Strict dependencies
- Convention

## Go Motivation

Combine:

- Fast compile times
- Ease of development
- Fast execution
- Reduces complexity of C
- Wicked fast build time

## Go vs. Javascript

- Typing
  - GO: Strongly typed
    - String, Float, Int, Byte, Struct...
  - JS: Dynamically typed
    - Think: Typescript
- Structures
  - GO: Structs, Pointers, Methods, Interfaces
    - Define behavior and attributes
  - JS: ES6 Classes (kind of)
    - Define behavior and attributes
- Error Handling:
  - GO: Explicit
    - Sad path won't handle itself
  - JS: Build in
    - You'll get yalled at regardless
- Multi-tasking
  - GO: Multi-Threaded
    - Concurrency, Goroutines, Sync
  - JS: Single-Threaded
    - Callbacks, async await, sagas, sadness
- Opinionated-ness
  - GO: Strong opinions
    - Convention, build in tooling and linters
  - JS: Fluid Opinions
    - Subjective to the mood that day

## Language Features

### Printing

```go
fmt.Println()
```

Package "fmt" implements formatted I/O with functions analogous to C's printf and scanf. The format 'verbs' are derived from C's but are simpler.

There are three main kinds of prints:

- **Print:** Prints output to the stdout console. Returns number of bytes and an error. (The error is generally not worried about)
  - fmt.Print()
  - fmt.Println()
  - fmt.Printf()
- **Fprint:** Prints the output to and external source (file, browser). Does not print to the stdout console. Returns number of bytes, and any write errors
  - fmt.FPrint()
  - fmt.FPrintln()
  - fmt.FPrintf()
- **Sprint:** Stores output on a character buffer. Does not print to stdout console. Returns number of bytes, and any write errors
  - fmt.SPrint()
  - fmt.SPrintln()
  - fmt.SPrintf()

### Types

- **Integer:** int int8 int32 int64 uint uint8 uint16 uint32 uint64
- **Float:** float32 float64
- **String:** string
- **Boolean:** bool (&& || ! < <= >= == !=)

When declare a variable without a value Go will fill it with default value:

- strings with ''
- integers with 0
- booleans with *false*
- floats with 0.0

### Control Structures

The three main control structures are:

- If
- Switch
- For
- For-Range

The *for* control flow can be wrapped in a label and can be use inside the reserved keywords: *break* and *continue*
