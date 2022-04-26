# DESIGN PATTERNS IN JAVASCRIPT

## Introduction

- Design patters are common architectual approaches
- Popularized by the Gang of Four book
- Universally relevant
  - Internalized in some programming languages
  - Libraries
  - Your own code!

## The Patterns

- Creational
  - Builders
  - Factories
    - Abstract Factory
    - Factory Method
  - Prototype
  - Singleton
- Structural
  - Adapter
  - Bridge
  - Composite
  - Decorator
  - Facade
  - Flyweight
  - Proxy
- Behavioral
  - Chain of Responsibility
  - Command
  - Interpreter
  - Iterator
  - Mediator
  - Memento
  - Observer
  - State
  - Strategy
  - Tempate Method
  - Visitor

## SOLID

- Design principles introduced by Robert C. Martin
- Frequently references in Design Pattern literature

### S -> Single Responsible Principle

It's a very simple principle because it tells you that a class should have a single primary responsibility and as a consequence, it should only have one reason to change. That reason being somehow related to it's responsibility.

In other words, it's a bad idea to add more than one responsibility to a class.

It's better to group functionality by class instead of sticking all of the functionality into a single class, for example.

The anti-pattern it's a nasty pattern called a God object. A God object is basically like this one huge, massive class that has lots and lots and lots of responsibilities lots of spaghetti code, very difficult to figure out.

Another term that we use quite often is called separation of concerns. Separation of concerns is what you do when you refactor, for example, let's suppose you find a really complicated algorithm. What you're trying to do is you try to split it up into several different parts which are somehow related. So this idea of separation of concerns is once again this idea that you have several different concerns, like persistance, some sort of post-processing, parallelism, whatever that happens to be.

Then you separate those into separate components so as to make the entire system easier to figure out, easier to manage, easier to refactor as well.

### Open Close Principle

First of all, the idea of the open close principle is that classes are open for extension, but close for modification, meaning you never jump into an existing class and start to modify it unless you absolutely have to.

Unless there is like a bug in there, then yeah, by the extending functionality is not such a good thing.

In some cases, if you are completely in control of your code and if there are no heavy dependencies, there is really no problem in doing it. But generally, it's not such a great practice because it affects scalability, defects, maintainabilityof your code.

So it's not a great thing.

So a better approach is to basically use use inheritance or use some sort of way of extending functionality.

### Liskov Substitution Principle

So essentially, the LSP, the Liskov Substitution Principle, says that if you have, let's say, a function which takes a base class like rectangle, it should be able to take a derived class like square without breaking the functionality in any way or ""you should be able to use any derived class instead of a parent class and have it behave in the same manner without modification"

### Interface Segregation Principle

So the interface segregation principle basically means that you have to segregate or split up interfaces into different parts so the people don't implement more than what they need.

So, for example, if you want to formalize the contract that you would have for a printer, then you would make an interface, which just the print method, so you might define the following, you might define a class called printer, you might introduce a constructor which makes sure it's abstract, and then you define the print method.

So that's that's pretty much it then.

### Dependency Inversion Principle

The dependency inversion principle doesn't have anything directly to do with dependency injection, another term that you might have heard thrown around in different programming languages.

The dependency inversion principle basically defines a relationship that you should have between low level modules and high level modules.

### Summary

- **Single Responsability Principle:**
  - A class should only have one reason to change
  - Separation of concers -  different classes hadling different, independent tasks/problems
- **Open-Closed Principle:**
  - Classes should be open for extension but closed for modification
- **Liskov Substitution Principle:**
  - You should be abble to substitute a base type for a subtype
- **Interface Segregation Principle:**
  - Don't put too much into an interface; split into a separate interfaces
  - YAGNI - You Ain't Going to Need It
- **Dependency Inversion Principle:**
  - High-level modules should not depend upon low-level ones; use abstractions.

## Gamma Categorization

- Design Patters are typically split into three categories
- This is called *Gamma Categorization* after Erich Gamma, one of GoF authors
- Creation Patters
  - Deal with the creation (contruction) of objects
  - Explicit (contructor) vs implicit (DI, reflection, etc.)
  - Wholesale (single statement) vs. piecewise (step-by-step)
- Structural Patters
  - Concerned with the structure (e.g., class members)
  - Many patters are wrappers that mimic the inderlying class interface
  - Stress the importance of good API design
- Behavioral Patterns
  - They are all diferent; no central theme

## Builder
  
- Some objects are simple and can be created in a single initializer call
- Other objects require a lot of ceremony to create
- Having an object with 10 initializer arguments is not productive
- Instead, opt for piecewise contruction
- Builder provides an API for constructiong an object step-by-step
  
### Builder Definition

When piecewise object construction is complicated, provide an API for doing it succinctly.

### Builder Summary

- A builder is a separate component for building an object
- Can either give builder an initializer or return it via a static function
- To make builder fluent, return self
- Different facets of an object can be build with different builders working in tandem via a base class

## Factory

- Object creation logic becomes too convoluted
- Initializer is not descriptive
  - Name is always ***__init__***
  - Cannot overload with same sets of arguments with different names
  - Can turn into "optional parameter hell"
- Wholesale object creation (non-piecewise, unlike Builder) can be outsourced to
  - A separate method (Factory Method)
  - That may exist in a separate class (Factory)
  - Can create hierarchy of factories with Abstract Factory

### Factory Definition

A component responsible solely for the wholesale (not piecewise) creation of objects.

### Factory Summary

- A *factory method* is a static method that creates objects
- A factory is any entity that can take care of object creation
- A factory can be external or reside inside the object as an innet class
- Hierarchies of factories can be used to create related objects

## Prototype

- Complicated objects (e.g. cars) aren't designed from scratch
  - They reiterate existing designs
- An existing (partially or fully contructed) design is a Prototype
- We make a copy (clone) the prototype and customize it
  - Requires 'deep copy' support
- We make the cloning convenient (e.g. via Factory)

### Prototype Definition

A partially or fully initialized object that you copy (clone) and make use of.

### Prototype Summary

- To implement a prototype, partially construct an object and store somewhere
- Deep copy the prototype
- Customize the resulting instance
- A factory provides a convenient API for using prototypes
