# Unit Testing and Test Driven Development

- [Unit Testing and Test Driven Development](#unit-testing-and-test-driven-development)
  - [Unit Testing](#unit-testing)
    - [Why](#why)
    - [Testing Levels](#testing-levels)
    - [Example](#example)
    - [Summary](#summary)
  - [Test Driven Development](#test-driven-development)
    - [Benefits](#benefits)
    - [Workflow](#workflow)
    - [**Uncle Bob's 3 Laws of TDD**](#uncle-bobs-3-laws-of-tdd)
  - [Test Suites](#test-suites)
    - [Nested Test Suites](#nested-test-suites)
    - [Example](#example-1)
  - [Assert API](#assert-api)
    - [BDD Style Assert](#bdd-style-assert)
      - [Example](#example-2)
    - [Language Chains](#language-chains)
  - [Testing Asynchronous Code](#testing-asynchronous-code)
    - [Async Code](#async-code)
    - [Test](#test)
  - [Tools](#tools)
    - [Mocha](#mocha)
    - [Chai](#chai)
    - [Vitest](#vitest)

## Unit Testing

### Why

- Software bugs hurt the business
- Software testing catches the bugs before they get to the field
- Need several levels of safety ents

### Testing Levels

- **Unit Testing:** Testing at functional level. Validates individual functions in the production code. They are generally the most comprehensive tests ans should test all positive and negative test cases for a function. Gropus of tests can be combined into test suites for better organization. You should executes in the development environment rather than the production environment.
- **Component Testing:** Testing is at the library and compiled binary level. They tests the external interfaces for individual components. Components are essentially a collection of the functions.
- **System Testing:**: Test the external interfaces of a system which is a collection of sub-systems. Systems can be collections of components or of subsystems.
- **Performance Testing:** Testing done at sub-system and system levels to verify timing and resource usages are acceptable.

### Example

```javascript
// Production Code
function str_len(theStr) {
  return theStr.length;
}

// A Unit Test
it('returns length of the string', () => {
  testStr = '1';                // Setup
  result = str_len(testStr);    // Action
  expect(result).to.equal(1);   // Assert
})
```

### Summary

- Unit tests are the first safety net for catching bugs before they get to the field
- Unit test validate test cases for individual functions
- They should build and run in the developer's development environment
- Unit test should run fast!

## Test Driven Development

- A process where the developer takes personal responsability for the quality of their code.
- Unit test are writtern *before* the production code
- Don't write al the rest or production code. First, you write one unit test for one test case and then you write the production code to make it pass.
- Tests and production code are both written togethr in small bits of functionality.

### Benefits

- Gives you the confidence to change the code.
- Gives you immediate feedback
- Documents what the code is doing
- Drives good object oriented design (?)

### Workflow

- TDD has the following phases in its workflow
  - ***(RED Phase)*** Write a failing unit test.
  - ***(GREEN Phase)*** Write just enough production code to make that test pass.
  - ***(REFACTOR Phase)*** Refactor the unit test and the production code to make it clean.
  - Repeat until the feature is complete.

### **Uncle Bob's 3 Laws of TDD**

- You may not write any production code until you have written a failing unit test
- You may not write more of a unit test than is sufficient to fail, and not compiling is failing. This forces you to write only enough of a unit test for the next test case and the next test case should always be the simplest test case.
- You may not write more production code than is sufficient to pass the currently failing unit test.

## Test Suites

- Test suites allow you to group similar test together.
- Test suites are defined in Mocha with the "describe" API call.
- All test defined inside of the "describe" function are part of that test suite.

### Nested Test Suites

- Mocha allows you to have nested test suites.
- Specify a nested test suite by making a new "describe" call inside an existing "describe" call.
- Many test suites and unit test can be created at each nesting level.

### Example

```javascript
var expect = require('chai').expect

describe('test_suite', () => {
  it('returns true', () => {
    expect(call()).to.equal(true)
  })
})
```

## Assert API

- Chai provides a classic assert API like what is typically found in other testing frameworks
- Basic call with expression and message parameters
- The expressions parameter is tested for "truthiness" and if it passes the assert passes
- When the assert fails the specified message is included in the failure output
- The Assert API provides MANY additional calls to easily verify defferent things.
- Most all of these API calls take one of two forms:
  - Expression to evaluate with an optional failure message
  - Actual value compared with an expected value with an optional failure message.
- The additional assert API calls include calls for:
  - Verifying equality of one value to another.
  - Verifying the type of a value.
  - Verifying the properties of objects.
  - Verifying exceptions are or are not thrown.

### BDD Style Assert

- Chai provides a BDD assert style which is exposed through the "expect" and "should" API calls
- This API allows you to chain additional calls to create a natural language represetnation of the expected behavior.
- The "expect" call is added as a reference to your script and is passed in a value to test
- "should" is called by your script and adds a "should"  property to Object.prototype

#### Example

```javascript
var expect = require('chai').expect
var should = require('chai').should()

it('likes BDD!', () => {
  var result = productionCall();
  expect(result).to.equal(true);
  result.should.equal(true);
})
```

### Language Chains

- Chai provides a set of chainable getter methods for creating natural language assertions
  - to, be, been, is, that, which, has, have, with, at, of, same, but, does
- Combine these language chain calls together along with the actual assetion call to create a natural language statement.

## Testing Asynchronous Code

### Async Code

- Async calls return immediately and continue to run in the background
- Async calls generally notify the caller that they have completed their work either via a callback function.
- Examples of async calls:
  - Timers
  - HTTP Requests
  - Database Operations

### Test

- To test async code depends of the type of async code you are using. If you are using callbacks you should pass a "done" parameter provided by Chai. With Promises and async/await you just have to invoke the code and test the value in the .then() method or try/catch block

## Tools

### Mocha

- Unit testing framework for javascript that works both in NodeJS and the browser
- Implements an API for testing that follows Behavior Driven Development (BDD) to help write test describe system stories.
- Provide hooks to execute code before and after each individual test or suites of tests.
- Provide an API for testing asynchronous code via Promises.
- Has command line parameters to help filter which test are executed and in what order.

### Chai

- Chai is a javascript assertion library that can alse be run in both node and web browser.
- Like Mocha, Chai implements an API for specifying "expectations" that follows BDD style of testing
- Also provide an API for classical TDD style of assertions.
- The BDD API provides a set of test calls that can be chained together to create a expectation that can be read as natural language. ***i.e. expect(result).to.equal(1)***

### Vitest

- Vitest is a blazing fast javascript unit test framework powered by Vite.
- Chai built-in for assertions + Jest expect compatible APIs
