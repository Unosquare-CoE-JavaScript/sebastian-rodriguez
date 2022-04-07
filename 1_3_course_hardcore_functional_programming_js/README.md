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

## Functor

A thing with a ***map*** method.

## Notes

- When you are working with currying functions. The data "should" be asbtract. If you tigh tha data parameter with an specific name, you will have a very specific function attached to a domain
