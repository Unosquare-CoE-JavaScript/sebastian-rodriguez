# Learn Go with Test

- [Learn Go with Test](#learn-go-with-test)
  - [**Objectives**](#objectives)
  - [**How to test**](#how-to-test)
  - [**Writing test**](#writing-test)
    - [**if**](#if)
    - [**nil**](#nil)
    - [**Declaring variables**](#declaring-variables)
    - [**t.Errorf**](#terrorf)
  - [**Go doc**](#go-doc)
  - [**Document code**](#document-code)
  - [Table Driven Test](#table-driven-test)
  - [**Language Features**](#language-features)
    - [**Constants**](#constants)
    - [**Switch**](#switch)
    - [**Iteration**](#iteration)
    - [**Array & Slices**](#array--slices)
    - [**Structs, methods & interfaces**](#structs-methods--interfaces)
      - [**Methods**](#methods)
      - [**Interfaces**](#interfaces)
        - [**Empty Interface**](#empty-interface)
        - [**Decoupling**](#decoupling)
      - [**Pointers**](#pointers)

## **Objectives**

- Explore the Go language by writing tests
- Get a grounding with TDD. Go is a good language for learning TDD because it is a simple language to learn and testing is built-in
- Be confident that you'll be able to start writing robust, well-tested systems in Go

## **How to test**

How do you test this? It is good to separate your "domain" code from the outside world (side-effects). For example, the **fmt.Println** is a side effect (printing to stdout) and the string we send in is our domain.

When using a statically typed language like Go it is important to listen to the compiler. The compiler understands how your code should snap together and work so you don't have to.

Let's go over the cycle again

- Write a test
- Make the compiler pass
- Run the test, see that it fails and check the error message is meaningful
- Write enough code to make the test pass
- Refactor
- 
On the face of it this may seem tedious but sticking to the feedback loop is important.

Not only does it ensure that you have relevant tests, it helps ensure you design good software by refactoring with the safety of tests.

Seeing the test fail is an important check because it also lets you see what the error message looks like. As a developer it can be very hard to work with a codebase when failing tests do not give a clear idea as to what the problem is.

By ensuring your tests are fast and setting up your tools so that running tests is simple you can get in to a state of flow when writing your code.

By not writing tests you are committing to manually checking your code by running your software which breaks your state of flow and you won't be saving yourself any time, especially in the long run.

## **Writing test**

Writing a test is just like writing a function, with a few rules

- It needs to be in a file with a name like xxx_test.go
- The test function must start with the word Test
- The test function takes one argument only t \*testing.T
- In order to use the \*testing.T type, you need to import "testing", like we did with fmt in the other file

For now, it's enough to know that your t of type \*testing.T is your "hook" into the testing framework so you can do things like t.Fail() when you want to fail.

We've covered some new topics:

### **if**

If statements in Go are very much like other programming languages.

### **nil**

- Pointers can be nil
- When a function returns a pointer to something, you need to make sure you check if it's nil or you might raise a runtime exception - the compiler won't help you here.
- Useful for when you want to describe a value that could be missing

### **Declaring variables**

We're declaring some variables with the syntax varName := value, which lets us re-use some values in our test for readability.

### **t.Errorf**

We are calling the Errorf method on our t which will print out a message and fail the test. The f stands for format which allows us to build a string with values inserted into the placeholder values %q. When you made the test fail it should be clear how it works.

## **Go doc**

Another quality of life feature of Go is the documentation. You can launch the docs locally by running godoc -http :8000. If you go to localhost:8000/pkg you will see all the packages installed on your system.

The vast majority of the standard library has excellent documentation with examples. Navigating to http://localhost:8000/pkg/testing/ would be worthwhile to see what's available to you.

If you don't have godoc command, then maybe you are using the newer version of Go (1.14 or later) which is no longer including godoc. You can manually install it with go install golang.org/x/tools/cmd/godoc@latest.

## **The TDD process and why the steps are important**

- Write a failing test and see it fail so we know we have written a relevant test for our requirements and seen that it produces an easy to understand description of the failure
- Writing the smallest amount of code to make it pass so we know we have working software
- Then refactor, backed with the safety of our tests to ensure we have well-crafted code that is easy to work with

TDD is a skill that needs practice to develop, but by breaking problems down into smaller components that you can test, you will have a much easier time writing software.

It is important to question the value of your tests. It should not be a goal to have as many tests as possible, but rather to have as much confidence as possible in your code base. Having too many tests can turn in to a real problem and it just adds more overhead in maintenance. Every test has a cost.

## **Document code**

![Integers Package Documentation](assets/package_integers.png)

## Table Driven Test

[Table driven test](https://github.com/golang/go/wiki/TableDrivenTests) are useful when you want to build a list of test cases that can be tested in the same manner.



## **Language Features**

### **Constants**

Constants are immutable values with a specific data type.

#### **What can be a constant**

Any literal is a constant in Go. Some of the constants in Go would be:

- Integer: 1234
- Floating point: 23.56
- Boolean: true, false
- Rune: 0x0048
- Complex: 7+6i
- String: “Hello”

### **Switch**

When you have lots of if statements checking a particular value it is common to use a switch statement instead. We can use switch to refactor the code to make it easier to read and more extensible if we wish to add more language support later

### **Iteration**

To do stuff repeatedly in Go, you'll need for. In Go there are no while, do, until keywords, you can only use for. Which is a good thing!

### **Array & Slices**

Arrays allow you to store multiple elements of the same type in a variable in a particular order.

When you have an array, it is very common to have to iterate over them. So let's use our new-found knowledge of for to make a Sum function. Sum will take an array of numbers and return the total.

Arrays have a fixed capacity which you define when you declare the variable. We can initialize an array in two ways:

- `[N]type{value1, value2, ..., valueN}` e.g. `numbers := [5]int{1, 2, 3, 4, 5}`
- `[...]type{value1, value2, ..., valueN}` e.g. `numbers := [...]int{1, 2, 3, 4, 5}`

It is sometimes useful to also print the inputs to the function in the error message. Here, we are using the %v placeholder to print the "default" format, which works well for arrays.

An interesting property of arrays is that the size is encoded in its type. If you try to pass an `[4]int` into a function that expects `[5]int`, it won't compile. They are different types so it's just the same as trying to pass a string into a function that wants an int.

You may be thinking it's quite cumbersome that arrays have a fixed length, and most of the time you probably won't be using them!

Go has slices which do not encode the size of the collection and instead can have any size.

the slice type which allows us to have collections of any size. The syntax is very similar to arrays, you just omit the size when declaring them
`mySlice := []int{1,2,3}` rather than `myArray := [3]int{1,2,3}`

### **Structs, methods & interfaces**

Suppose that we need some geometry code to calculate the perimeter of a rectangle given a height and width. We can write a Perimeter(width float64, height float64) function, where float64 is for floating-point numbers like 123.45.

A struct is just a named collection of fields where you can store data.

#### **Methods**

A method in golang is nothing but a function with a receiver. A receiver is an instance of some specific type such as struct, but it can be an instance of any other custom type. So basically when you attach a function to a type, then that function becomes a method for that type. The method will have access to the properties of the receiver and can call the receiver’s other methods.

#### **Interfaces**

In general programming interfaces are contracts that have a set of functions to be implemented to fulfill that contract. Go is no different. Go has great support for interfaces and they are implemented in an implicit way. They allow polymorphism in Go. In this post, we will talk about interfaces, what they are, and how they can be used.

##### **Empty Interface**

An interface is empty if it has no functions at all. An empty interface holds any type. That’s why it is extremely useful in many cases. Below is the declaration of an empty interface.

`var i interface{}`

##### **Decoupling**

Notice how our helper does not need to concern itself with whether the shape is a Rectangle or a Circle or a Triangle. By declaring an interface, the helper is decoupled from the concrete types and only has the method it needs to do its job.

This kind of approach of using interfaces to declare only what you need is very important in software design and will be covered in more detail in later sections.

#### **Pointers**

In Go, **when you call a function or a method the arguments are copied.**

Pointers let us point to some values and then let us change them. So rather than taking a copy of the whole Wallet, we instead take a pointer to that wallet so that we can change the original values within it.

These pointers to structs even have their own name: struct pointers and they are automatically dereferenced.