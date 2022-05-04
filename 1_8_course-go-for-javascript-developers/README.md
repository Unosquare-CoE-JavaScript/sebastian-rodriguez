# Go for Javacsript Developers

- [Go for Javacsript Developers](#go-for-javacsript-developers)
  - [Go History](#go-history)
  - [Go Features](#go-features)
  - [Go Motivation](#go-motivation)
  - [Go vs. Javascript](#go-vs-javascript)
  - [Go Tooling](#go-tooling)
    - [Commands](#commands)
    - [Packages](#packages)
  - [Language Features](#language-features)
    - [Printing](#printing)
    - [Types](#types)
    - [Control Structures](#control-structures)
    - [Functions](#functions)
    - [Arrays](#arrays)
    - [Slices](#slices)
      - [MAKE](#make)
    - [Maps](#maps)
    - [Structs](#structs)
    - [Pointers](#pointers)
    - [Methods](#methods)
    - [Interfaces](#interfaces)
      - [The Empty Interface (interface{})](#the-empty-interface-interface)
  - [Testing](#testing)
  - [Error Handling](#error-handling)
    - [Error](#error)
    - [Panic](#panic)
    - [Defer](#defer)
    - [Recover](#recover)

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

## Go Tooling

### Commands

```
go run main.go
go install
go build
go fmt main.go
go list
go vet
go doc fmt.Print
go get golang.org/x/lint/golint
golint
```

### Packages

```go
package main

import (
  "fmt"
  "math"
  "reflect"
)
```

In the most basic terms, A package is nothing but a directory inside your Go workspace containing one or more Go source files, or other Go packages.

Every Go source file belongs to a package.

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

### Functions

A function in go starts with reserved keyword *func* with a *name* then the parameters of the functions (*name* *type*) and optionally you can add the return *type* and finally the *body of the function*

### Arrays

Arrays allow you to store multiple elements of the same type in a variable in a particular order.

An array is a data structure that consists of a collection of elements of a single type or simply you can say a special variable, which can hold more than one value at a time. The values an array holds are called its elements or items. An array holds a specific number of elements, and it cannot grow or shrink. Different data types can be handled as elements in arrays such as Int, String, Boolean, and others. The index of the first element of any dimension of an array is 0, the index of the second element of any array dimension is 1, and so on.

### Slices

Go has slices which do not encode the size of the collection and instead can have any size.

The slice type which allows us to have collections of any size. The syntax is very similar to arrays, you just omit the size when declaring them

Introduction of Slices, managing collections of data with slices and adding and removing elements from a slice.

A slice is a flexible and extensible data structure to implement and manage collections of data. Slices are made up of multiple elements, all of the same type. A slice is a segment of dynamic arrays that can grow and shrink as you see fit. Like arrays, slices are index-able and have a length. Slices have a capacity and length property.

SLICES
Segments of an underlying array
(+MAKE)
Must be associated with space in memory

#### MAKE

According to the docs:

Make "Initializes and allocates space in memory for a slice, map, or channel"

### Maps

A map is a data structure that provides you with an unordered collection of key/value pairs (maps are also sometimes called associative arrays in Php, hash tables in Java, or dictionaries in Python). Maps are used to look up a value by its associated key. You store values into the map based on a key.

The strength of a map is its ability to retrieve data quickly based on the key. A key works like an index, pointing to the value you associate with that key.

A map is implemented using a hash table, which is providing faster lookups on the data element and you can easily retrieve a value by providing the key. Maps are unordered collections, and there's no way to predict the order in which the key/value pairs will be returned. Every iteration over a map could return a different order.

### Structs

A struct (short for "structure") is a collection of data fields with declared data types. Golang has the ability to declare and create own data types by combining one or more types, including both built-in and user-defined types. Each data field in a struct is declared with a known type, which could be a built-in type or another user-defined type.

Structs are the only way to create concrete user-defined types in Golang. Struct types are declared by composing a fixed set of unique fields. Structs can improve modularity and allow to create and pass complex data structures around the system. You can also consider Structs as a template for creating a data record, like an employee record or an e-commerce product.

The declaration starts with the keyword type, then a name for the new struct, and finally the keyword struct. Within the curly brackets, a series of data fields are specified with a name and a type.

### Pointers

"A ***pointer*** in Go is a variable that holds the ***memory location*** of that variable instead of a copy of its value

Pointers in Go programming language is a variable that is used to store the memory address of another variable. Pointers in Golang is also termed as the special variables. The variables are used to store some data at a particular memory address in the system. The memory address is always found in hexadecimal format(starting with 0x like 0xFFAAF etc.).

```go
package main

import "fmt"

func main() {

  var name string
  var namePointer *string

  fmt.Println(name)
  fmt.Println(namePointer)
  fmt.Println(&name)

}
```

- Pointer type definitions are indicated with a * next to the ***type name***
  - Indicate that variable will *point to a memory location*
- Pointer vriable *calues* are visible with a * next to the ***variable name***
- To *read through* a variable to see the pointer address use a & next to the ***pointer variable name***

### Methods

A method in golang is nothing but a function with a receiver. A receiver is an instance of some specific type such as struct, but it can be an instance of any other custom type. So basically when you attach a function to a type, then that function becomes a method for that type.

```go
// Function
func some_func_name(arguments) return_values

//vs

// Method
func (receiver receiver_type) some_func_name(arguments) return_values
```

### Interfaces

A set of behaviors that define a type

The interface gives the developer flexibility where they can write a code in such a way that whoever will use the interface they will define the methods of the interface inside them according to their uses.

#### The Empty Interface (interface{})

- Specifies zero methods
- An empty interface may hold values of any type
  - These can be used by code that expects an unknown type
- Allows you to call methods and functions on types when you aren't entirely sure what will be expected
- Think the **any** type in typescript

## Testing

```go
// averange.go
// averange_test.go

package utils

import "testing"

func TestAverange(t *testing.T) {
  expected := 4
  actual := utils.averange(1,2,3)

  if actual != expected {
    t.ErrorF("Averange was incorrect! Expected %d, Actual %: %d", expected, actual)
  }
}

// go test
```

## Error Handling

You F***** UP

### Error

- Indicates that something bad happened, but it might be possible to continue running the program
- ie: A function that intentionally returns an error if domething goues wrong

### Panic

- Happens at runtime
- Something happended that was fatal to your program and program stop execution
- ex: Trying to open a file that doesn't exist

### Defer

In the Go programming language, defer is a keyword that allows developers to delay the execution of a function until the current function returns. What throws some people off is that the deferred function’s arguments are evaluated immediately, but the function itself doesn’t fire until the wrapping function exits.

### Recover

- **Panic** is called during a runtime error and fatally kill the program
- **Recover** tells Go what to do when that happens
  - Returns what passed to *panic*
- Recover must be paired with **defer**, which will fire event after a panic
