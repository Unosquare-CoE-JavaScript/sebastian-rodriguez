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
