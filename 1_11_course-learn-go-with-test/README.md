# Learn Go with Test

- [Learn Go with Test](#learn-go-with-test)
  - [**Objectives**](#objectives)
  - [**How to test**](#how-to-test)
  - [**Writing test**](#writing-test)
    - [**if**](#if)
    - [**nil**](#nil)
    - [**Declaring variables**](#declaring-variables)
    - [**t.Errorf**](#terrorf)
    - [**struct{}**](#struct)
  - [**Go doc**](#go-doc)
  - [**Document code**](#document-code)
  - [**Table Driven Test**](#table-driven-test)
  - [**Dependency Injection**](#dependency-injection)
    - [Mocks](#mocks)
  - [**Concurrency**](#concurrency)
    - [**A quick aside into a parallel(ism) universe..**](#a-quick-aside-into-a-parallelism-universe)
  - [**Channels**](#channels)
    - [**Always make channels**](#always-make-channels)
  - [**Optimizations**](#optimizations)
  - [**Reflection**](#reflection)
  - [Sync](#sync)
  - [**Language Features**](#language-features)
    - [**Constants**](#constants)
    - [**Switch**](#switch)
    - [**Iteration**](#iteration)
    - [**Array & Slices**](#array--slices)
    - [**Structs, methods & interfaces**](#structs-methods--interfaces)
      - [**Methods**](#methods)
      - [**Interfaces**](#interfaces)
        - [**Empty Interface - interface{}**](#empty-interface---interface)
        - [**Decoupling**](#decoupling)
      - [**Pointers**](#pointers)
    - [**Maps**](#maps)
    - [**Defer**](#defer)
    - [**Select**](#select)

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

### **struct{}**

Why `struct{}` and not another type like a bool? Well, a chan struct{} is the smallest data type available from a memory perspective so we get no allocation versus a bool. Since we are closing and not sending anything on the chan, why allocate anything?

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

## **Table Driven Test**

[Table driven test](https://github.com/golang/go/wiki/TableDrivenTests) are useful when you want to build a list of test cases that can be tested in the same manner.

## **Dependency Injection**

Motivated by our tests we refactored the code so we could control where the data was written by injecting a dependency which allowed us to:

- Test our code If you can't test a function easily, it's usually because of dependencies hard-wired into a function or global state. If you have a global database connection pool for instance that is used by some kind of service layer, it is likely going to be difficult to test and they will be slow to run. DI will motivate you to inject in a database dependency (via an interface) which you can then mock out with something you can control in your tests.
- Separate our concerns, decoupling where the data goes from how to generate it. If you ever feel like a method/function has too many responsibilities (generating data and writing to a db? handling HTTP requests and doing domain level logic?) DI is probably going to be the tool you need.
- Allow our code to be re-used in different contexts The first "new" context our code can be used in is inside tests. But further on if someone wants to try something new with your function they can inject their own dependencies.

### Mocks

While this is a pretty trivial program, to test it fully we will need as always to take an iterative, test-driven approach.

What do I mean by iterative? We make sure we take the smallest steps we can to have useful software.

We don't want to spend a long time with code that will theoretically work after some hacking because that's often how developers fall down rabbit holes. It's an important skill to be able to slice up requirements as small as you can so you can have working software.

Here's how we can divide our work up and iterate on it:
- Print 3
- Print 3, 2, 1 and Go!
- Wait a second between each line

Normally a lot of mocking points to bad abstraction in your code.

**What people see here is a weakness in TDD but it is actually a strength, more often than not poor test code is a result of bad design or put more nicely, well-designed code is easy to test.**

Try to make it so your tests are testing useful behaviour unless the implementation is really important to how the system runs.

It is sometimes hard to know what level to test exactly but here are some thought processes and rules I try to follow:

- The definition of refactoring is that the code changes but the behaviour stays the same. If you have decided to do some refactoring in theory you should be able to make the commit without any test changes. So when writing a test ask yourself
  - Am I testing the behaviour I want, or the implementation details?
  - If I were to refactor this code, would I have to make lots of changes to the tests?
-Although Go lets you test private functions, I would avoid it as private functions are implementation detail to support public behaviour. Test the public behaviour. Sandi Metz describes private functions as being "less stable" and you don't want to couple your tests to them.
- I feel like if a test is working with more than 3 mocks then it is a red flag - time for a rethink on the design
- Use spies with caution. Spies let you see the insides of the algorithm you are writing which can be very useful but that means a tighter coupling between your test code and the implementation. Be sure you actually care about these details if you're going to spy on them

## **Concurrency**

For the purposes of the following, means 'having more than one thing in progress'. This is something that we do naturally everyday.

For instance, this morning I made a cup of tea. I put the kettle on and then, while I was waiting for it to boil, I got the milk out of the fridge, got the tea out of the cupboard, found my favourite mug, put the teabag into the cup and then, when the kettle had boiled, I put the water in the cup.

What I didn't do was put the kettle on and then stand there blankly staring at the kettle until it boiled, then do everything else once the kettle had boiled.

If you can understand why it's faster to make tea the first way, then you can understand how we will make CheckWebsites faster. Instead of waiting for a website to respond before sending a request to the next website, we will tell our computer to make the next request while it is waiting.

Normally in Go when we call a `function doSomething()` we wait for it to return (even if it has no value to return, we still wait for it to finish). We say that this operation is blocking - it makes us wait for it to finish. An operation that does not block in Go will run in a separate process called a goroutine. Think of a process as reading down the page of Go code from top to bottom, going 'inside' each function when it gets called to read what it does. When a separate process starts it's like another reader begins reading inside the function, leaving the original reader to carry on going down the page.

To tell Go to start a new goroutine we turn a function call into a go statement by putting the keyword go in front of it: `go doSomething()`.

Because the only way to start a goroutine is to put go in front of a function call, we often use anonymous functions when we want to start a goroutine. An anonymous function literal looks just the same as a normal function declaration, but without a name (unsurprisingly). You can see one above in the body of the for loop.

Anonymous functions have a number of features which make them useful, two of which we're using above. Firstly, they can be executed at the same time that they're declared - this is what the () at the end of the anonymous function is doing. Secondly they maintain access to the lexical scope they are defined in - all the variables that are available at the point when you declare the anonymous function are also available in the body of the function.

### **A quick aside into a parallel(ism) universe..**

You might not get this result. You might get a panic message that we're going to talk about in a bit. Don't worry if you got that, just keep running the test until you do get the result above. Or pretend that you did. Up to you. Welcome to concurrency: when it's not handled correctly it's hard to predict what's going to happen. Don't worry - that's why we're writing tests, to help us know when we're handling concurrency predictably.

## **Channels**

Channels are a Go data structure that can both receive and send values. These operations, along with their details, allow communication between different processes.

### **Always make channels**

Notice how we have to use make when creating a channel; rather than say var ch chan struct{}. When you use var the variable will be initialised with the "zero" value of the type. So for string it is "", int it is 0, etc.

For channels the zero value is nil and if you try and send to it with <- it will block forever because you cannot send to nil channels

## **Optimizations**

- http://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast
- http://wiki.c2.com/?PrematureOptimization

## **Reflection**

Reflection in computing is the ability of a program to examine its own structure, particularly through types; it's a form of metaprogramming. It's also a great source of confusion.

Ref:
- [The Golang Reflection](https://go.dev/blog/laws-of-reflection)
- [The laws of reflection](https://blog.golang.org/laws-of-reflection)

As a writer of such a function, you have to be able to inspect anything that has been passed to you and try and figure out what the type is and what you can do with it. This is done using reflection. This can be quite clumsy and difficult to read and is generally less performant (as you have to do checks at runtime).

**In short only use reflection if you really need to.**

If you want polymorphic functions, consider if you could design it around an interface (not interface, confusingly) so that users can use your function with multiple types if they implement whatever methods you need for your function to work.

Our function will need to be able to work with lots of different things. As always we'll take an iterative approach, writing tests for each new thing we want to support and refactoring along the way until we're done.

## Sync

Package sync provides basic synchronization primitives such as mutual exclusion locks. Other than the Once and WaitGroup types, most are intended for use by low-level library routines. Higher-level synchronization is better done via channels and communication.

Values containing the types defined in this package should not be copied.

Ref:
- (MutexOrChannel)[https://github.com/golang/go/wiki/MutexOrChannel]

---

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

##### **Empty Interface - interface{}**

An interface is empty if it has no functions at all. An empty interface holds any type. That’s why it is extremely useful in many cases. Below is the declaration of an empty interface.

`var i interface{}`

##### **Decoupling**

Notice how our helper does not need to concern itself with whether the shape is a Rectangle or a Circle or a Triangle. By declaring an interface, the helper is decoupled from the concrete types and only has the method it needs to do its job.

This kind of approach of using interfaces to declare only what you need is very important in software design and will be covered in more detail in later sections.

#### **Pointers**

In Go, **when you call a function or a method the arguments are copied.**

Pointers let us point to some values and then let us change them. So rather than taking a copy of the whole Wallet, we instead take a pointer to that wallet so that we can change the original values within it.

These pointers to structs even have their own name: struct pointers and they are automatically dereferenced.

### **Maps**

Maps are one of the most useful data structures. It can store in key-value pairs and doesn’t allow for duplicate keys. Now, we will learn how the Go programming language implements maps.

An interesting property of maps is that you can modify them without passing as an address to it (e.g &myMap)

```
A map value is a pointer to a runtime.hmap structure.
```

Therefore, you should never initialize an empty map variable:

Instead, you can initialize an empty map like we were doing above, or use the make keyword to create a map for you:

### **Defer**

By prefixing a function call with defer it will now call that function at the end of the containing function.

Sometimes you will need to cleanup resources, such as closing a file or in our case closing a server so that it does not continue to listen to a port.

You want this to execute at the end of the function, but keep the instruction near where you created the server for the benefit of future readers of the code.

Our refactoring is an improvement and is a reasonable solution given the Go features covered so far, but we can make the solution simpler.

### **Select**

If you recall from the concurrency chapter, you can wait for values to be sent to a channel with `myVar := <-ch`. This is a blocking call, as you're waiting for a value.

What select lets you do is wait on multiple channels. The first one to send a value "wins" and the code underneath the case is executed.

We use ping in our select to set up two channels, one for each of our URLs. Whichever one writes to its channel first will have its code executed in the select, which results in its URL being returned (and being the winner).

After these changes, the intent behind our code is very clear and the implementation is actually simpler.
