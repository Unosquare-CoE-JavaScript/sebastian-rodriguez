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
