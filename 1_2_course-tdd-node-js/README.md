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
  - [Test Doubles](#test-doubles)
    - [Types](#types)
    - [Mock Frameworks](#mock-frameworks)
  - [Best Practices](#best-practices)
  - [Code Coverage Analysis](#code-coverage-analysis)
    - [Types](#types-1)
  - [Tools](#tools)
    - [Mocha](#mocha)
    - [Chai](#chai)
    - [Vitest](#vitest)
    - [Sinon.js](#sinonjs)
      - [Examples](#examples)
      - [Spies](#spies)
        - [Sinon Stubs](#sinon-stubs)
      - [Mocks](#mocks)
      - [Sinon Cleanup](#sinon-cleanup)

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
- The Assert API provides MANY additisonal calls to easily verify defferent things.
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

## Test Doubles

- Almost all code depends on and collaborates with other parts of the system.
- Those other parts of the system are not always wasy to replicate in the unit test environment or would make test slow if used directly

### Types

- **Dummy:** Objects that can be passed around as necessary but do not have any type of test implementation and should never be used
- **Fake:** These object generally have a simplified functional implementation of a particular interface that is adequate for testing
- **Stub:** These objects provide implementations with canned answers that are suitable for the test
- **Spies:** These objects provide implementations that record the calues that were passed in so they can be used by the test
- **Mocks:** These objects are pre-programmed to expect specific calls and parameters and can throw exceptions when neccesary

### Mock Frameworks

- Most mock frameworks provide easy ways for automatically creating any of these types of test doubles **at runtime**
- They provide a fast means for creating mocking expectations for you tests
- They can be much more efficient that implementing custom mock objects of your own creation
- Creating mock objects by hand can be tedious and error prone

## Best Practices

- Always do the net simplest test case
  - Doing the next simplest test case allows you to gradually increase the complexity of your code
  - If you jump into the complex test cases too quickly you will find yourself stuck writing a lof of functionality all at once
  - Beyond just slowing you down, this can also lead to bad design decisions
- Use descriptive test names
  - Code is read 1000 times more than it's written. Make it clear and readable!
  - Unit tests are the best documentation for how your code works. Make them easy to undestand.
  - Test suites should name the class or function under test and the test names should describe the functionality being tested.
- Keep test fast
  - One biggest benefits of TDD is the fast feedback on how your changes have affected things.
  - This goes away if your unit test take more than a few seconds to build and run
  - To help your test stay fast try:
    - Keep console output to a minimum. This slows things down and can clutter up the testing framework output.
    - Mock out any slow collaborators with test doubles that are fast.
- Use code coverage tools
  - Once you have all your test cases covered and you think you're done run your unit test through a code coverage tool
  - This can help you identify any test cases you may have missed (i.e. negative test cases).
  - You should have a goal of 100% code coverage functions with real logic in them (i.i. not simple getters/setters).
  - Istanbul is easy to install. It's a code coverage tool for javascript that generates easy to use html output
- Run your test multiple times and in random order
  - Running your test many times will help ensure that you don't have any flaky test that fail intermittently
  - Running you test in random order ensures that your tests don't have any dependencies between each other
- Use a static code analysis tool
  - This ensures code quality

## Code Coverage Analysis

- Code coverage tools analyze the execution of your production code as you run your unit tests to see what parts of the production code were executed
- Code coverage tools produce a report at the end of the execution specifying the coverage of the tests.
- The coverage report can tell you if you have any holes in your tests where parts of the production code are not being tested

### Types

- **Line:** The coverage report specifies which executable lines of the production code were executed
- **Statement:** THis verify that every individual statement is covered (even multiple statements on the same line)
- **Branch:** Shows the percentage of each branch point has been executed at least once
- **Modified Condition/Decision:** This is an advance form of branch coverage which verifies that all entry and exit points in a program has been invoked at least once and with all possible conditions critera combinations

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

### Sinon.js

- Javascript mocking framework
- Works in node and web server
- works well with Mocha and Chai

#### Examples

#### Spies

```javascript
it('test spies', () => {
  const callback = sinon.spy();
  prodFunction(callback)
  expect(callback).to.have.been.called()
})
```

- The most basic test double provided by Sinon is the spy.
- A spy is created by calling the ***sinon.spy*** method.
- A spy keeps track of:
  - How many times a function was called
  - What parameters were passed to the function
  - What value the function returned or if it threw

```javascript
// Method Wrapping Spy
it('test spies', () => {
  const tc = new TestClass()
  sinon.spy(tc, 'testFunction');
  tc.testFunction()
  expect(tc.testFunction()).to.have.been.called()
})
```

- Spies can be created in two fashions: either anonymous or wrapping a particular method
- Anonymous spies are used to create fake functions that need to be spied on during testing
- Method wrapping spies are created on existing functions such as class methods

##### Sinon Stubs

```javascript
//Sinon Stub
it('test stub', () => {
  const tc = new TestClass();
  sinon.stub(tc, 'testFunction');
  testCall(tc);
  expect(tc.testFunction).to.have.been.called()
})
```

- Stubs are like spies in that they can be anonymous or wrap existing functions
- Stubs support the full spy testing API
- Stubs are different from spies in that they do NOT call the wrapper function
- Stubs allow you to modify the behavior of the stubbed function call.

#### Mocks

```javascript
// Sinon Mocks
it('test mock', () => {
  const tc = new TestClass();
  const mock = sinon.mock(tc);
  mock.expects('func').once()
  testCall(tc)
  mock.verify();
})

```

- Sinon also provides an API for creating mock objects
- Sinon mocks provide all the capabilities of Sinon spies and stubs with the addition of pre-programmed expectations
- A mock will verify that the specified expectations have occurred and if not will fail the test.

#### Sinon Cleanup

````javascript
afterEach(() => {
  sinon.restore()
})
````

- Sinon creates all of its test doubles in a sandbox
- **After each test the sandbox needs to be reset to clear out all the test doubles that were created by calling the *sinon.restore* method**
