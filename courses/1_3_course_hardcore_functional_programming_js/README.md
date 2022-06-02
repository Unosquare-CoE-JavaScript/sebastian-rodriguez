# Hardcore Functional Programming in Javascript

## Function

Theoretically speaking. Every function is a *single-value* collection of pairs, input-output. An input cannot have 2 different outputs.

We call input **"Domain"** and the output **"Range"**. One input, one output.

In programming, functions are:

- **Total:** For every input there is a corresponding output and there is ALWAYS an output
- **Deterministic:** Alwaysreceive the same output for a given input
- **No Observable Side-Effects:** No observable effects besides computing a value

Why we should use pure functions:

- Reliable
- Portable
- Reusable
- Testable
- Composable
- Properties/Contract

## Curry

Function Currying is a concept of breaking a function with many arguments into many functions with single argument in such a way, that the output is same. In other words, its a technique of simplifying a multi-valued argument function into single-valued argument multi-functions.

## Composition

Function composition returns a new function and you can create sub compositions and compose new functions. The composition works like a giant pipeline. So you have this data structure that you're maintaining that's flowing through your pipeline.

**Definition:** In computer science, function composition is an act or mechanism to combine simple functions to build more complicated ones. Like the usual composition of functions in mathematics, the result of each function is passed as the argument of the next, and the result of the last one is the result of the whole.

## Functor

A thing with a ***map*** method...

**Definition:**

- In functional programming, a functor is a design pattern inspired by the definition from category theory, that allows for a generic type to apply a function inside without changing the structure of the generic type.
- A functor is a container of type a that, when subjected to a function that maps from a→b, yields a container of type b.
- In terms of functional programming, a Functor is a kind of container that can be mapped over by a function. It is basically an abstraction that allows us to write generic code that can be used for Futures, Options, Lists, Either, or any other mappable type. In simple terms, any type that has a map function defined and preferably an “identity function” is a Functor.

## Monads

- A monad acts as a container that abstracts away those quirks in the computations, and let us focus more on what we want to do with the contained values.
- In functional programming, a monad is a software design pattern with a structure that combines program fragments (functions) and wraps their return values in a type with additional computation. In addition to defining a wrapping monadic type, monads define two operators: one to wrap a value in the monad type, and another to compose together functions that output values of the monad type (these are known as monadic functions). General-purpose languages use monads to reduce boilerplate code needed for common operations (such as dealing with undefined values or fallible functions, or encapsulating bookkeeping code). Functional languages use monads to turn complicated sequences of functions into succinct pipelines that abstract away control flow, and side-effects. Both the concept of a monad and the term originally come from category theory, where a monad is defined as a functor with additional structure.[a] Research beginning in the late 1980s and early 1990s established that monads could bring seemingly disparate computer-science problems under a unified, functional model. Category theory also provides a few formal requirements, known as the monad laws, which should be satisfied by any monad and can be used to verify monadic code.
- Dictionary meaning of a Monad is a single unit but, in functional world Monad is termed as a combinator which combines different functions such that it appears to be a single. Monad is just a particular style of combinator. It is the key to Functional programming. Imperative programmers mostly ignore it or sometimes even feared of it. When we talk about the monads, the lot of fancy terminology from category theory that gets thrown around. However the concepts of category theory are irrelevant to what winds up being a simple and well understood functional programming concept. Monad are just like wrapping a value inside a box, unwrapping the value from the box and passing it the function to get the wrapped value

## Tasks



## Notes

- When you are working with currying functions. The data "should" be asbtract. If you tigh tha data parameter with an specific name, you will have a very specific function attached to a domain
