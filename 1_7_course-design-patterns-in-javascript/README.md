# DESIGN PATTERNS IN JAVASCRIPT

- [DESIGN PATTERNS IN JAVASCRIPT](#design-patterns-in-javascript)
  - [Introduction](#introduction)
  - [The Patterns](#the-patterns)
  - [SOLID](#solid)
    - [S -> Single Responsible Principle](#s---single-responsible-principle)
    - [O -> Open Close Principle](#o---open-close-principle)
    - [L -> Liskov Substitution Principle](#l---liskov-substitution-principle)
    - [I -> Interface Segregation Principle](#i---interface-segregation-principle)
    - [D -> Dependency Inversion Principle](#d---dependency-inversion-principle)
    - [Summary](#summary)
  - [Gamma Categorization](#gamma-categorization)
  - [Builder](#builder)
    - [Builder Definition](#builder-definition)
    - [Builder example](#builder-example)
    - [Builder Summary](#builder-summary)
  - [Factory](#factory)
    - [Factory Definition](#factory-definition)
    - [Factory Example](#factory-example)
    - [Factory Summary](#factory-summary)
  - [Prototype](#prototype)
    - [Prototype Definition](#prototype-definition)
    - [Prototype Example](#prototype-example)
    - [Prototype Summary](#prototype-summary)
  - [Singleton](#singleton)
    - [Singleton Definition](#singleton-definition)
    - [Singleton Example](#singleton-example)
    - [Singleton Summary](#singleton-summary)
  - [Adapter](#adapter)
    - [Adapter Definition](#adapter-definition)
    - [Adapter Example](#adapter-example)
    - [Adapter Summary](#adapter-summary)
  - [Bridge](#bridge)
  - [Bridge Definition](#bridge-definition)
    - [Bridge Example](#bridge-example)
    - [Bridge Summary](#bridge-summary)
  - [Composite](#composite)
    - [Composite Definition](#composite-definition)
    - [Composition Example](#composition-example)
    - [Composition Summary](#composition-summary)
  - [Decorator](#decorator)
    - [Decorator Definition](#decorator-definition)
    - [Decorator Example](#decorator-example)
    - [Decorator Summary](#decorator-summary)
  - [Facade](#facade)
    - [Facade Definition](#facade-definition)
    - [Facade Example](#facade-example)
    - [Facade Summary](#facade-summary)
  - [Flyweight](#flyweight)
    - [Flyweight Definition](#flyweight-definition)
    - [Flyweight Example](#flyweight-example)
    - [Flyweight Summary](#flyweight-summary)
  - [Bibliography](#bibliography)

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

### O -> Open Close Principle

First of all, the idea of the open close principle is that classes are open for extension, but close for modification, meaning you never jump into an existing class and start to modify it unless you absolutely have to.

Unless there is like a bug in there, then yeah, by the extending functionality is not such a good thing.

In some cases, if you are completely in control of your code and if there are no heavy dependencies, there is really no problem in doing it. But generally, it's not such a great practice because it affects scalability, defects, maintainabilityof your code.

So it's not a great thing.

So a better approach is to basically use use inheritance or use some sort of way of extending functionality.

### L -> Liskov Substitution Principle

So essentially, the LSP, the Liskov Substitution Principle, says that if you have, let's say, a function which takes a base class like rectangle, it should be able to take a derived class like square without breaking the functionality in any way or ""you should be able to use any derived class instead of a parent class and have it behave in the same manner without modification"

### I -> Interface Segregation Principle

So the interface segregation principle basically means that you have to segregate or split up interfaces into different parts so the people don't implement more than what they need.

So, for example, if you want to formalize the contract that you would have for a printer, then you would make an interface, which just the print method, so you might define the following, you might define a class called printer, you might introduce a constructor which makes sure it's abstract, and then you define the print method.

So that's that's pretty much it then.

### D -> Dependency Inversion Principle

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

### Builder example

```typescript
/**
 * The Builder interface specifies methods for creating the different parts of
 * the Product objects.
 */
interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}

/**
 * The Concrete Builder classes follow the Builder interface and provide
 * specific implementations of the building steps. Your program may have several
 * variations of Builders, implemented differently.
 */
class ConcreteBuilder1 implements Builder {
    private product: Product1;

    /**
     * A fresh builder instance should contain a blank product object, which is
     * used in further assembly.
     */
    constructor() {
        this.reset();
    }

    public reset(): void {
        this.product = new Product1();
    }

    /**
     * All production steps work with the same product instance.
     */
    public producePartA(): void {
        this.product.parts.push('PartA1');
    }

    public producePartB(): void {
        this.product.parts.push('PartB1');
    }

    public producePartC(): void {
        this.product.parts.push('PartC1');
    }

    /**
     * Concrete Builders are supposed to provide their own methods for
     * retrieving results. That's because various types of builders may create
     * entirely different products that don't follow the same interface.
     * Therefore, such methods cannot be declared in the base Builder interface
     * (at least in a statically typed programming language).
     *
     * Usually, after returning the end result to the client, a builder instance
     * is expected to be ready to start producing another product. That's why
     * it's a usual practice to call the reset method at the end of the
     * `getProduct` method body. However, this behavior is not mandatory, and
     * you can make your builders wait for an explicit reset call from the
     * client code before disposing of the previous result.
     */
    public getProduct(): Product1 {
        const result = this.product;
        this.reset();
        return result;
    }
}

/**
 * It makes sense to use the Builder pattern only when your products are quite
 * complex and require extensive configuration.
 *
 * Unlike in other creational patterns, different concrete builders can produce
 * unrelated products. In other words, results of various builders may not
 * always follow the same interface.
 */
class Product1 {
    public parts: string[] = [];

    public listParts(): void {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}

/**
 * The Director is only responsible for executing the building steps in a
 * particular sequence. It is helpful when producing products according to a
 * specific order or configuration. Strictly speaking, the Director class is
 * optional, since the client can control builders directly.
 */
class Director {
    private builder: Builder;

    /**
     * The Director works with any builder instance that the client code passes
     * to it. This way, the client code may alter the final type of the newly
     * assembled product.
     */
    public setBuilder(builder: Builder): void {
        this.builder = builder;
    }

    /**
     * The Director can construct several product variations using the same
     * building steps.
     */
    public buildMinimalViableProduct(): void {
        this.builder.producePartA();
    }

    public buildFullFeaturedProduct(): void {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}

/**
 * The client code creates a builder object, passes it to the director and then
 * initiates the construction process. The end result is retrieved from the
 * builder object.
 */
function clientCode(director: Director) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);

    console.log('Standard basic product:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();

    console.log('Standard full featured product:');
    director.buildFullFeaturedProduct();
    builder.getProduct().listParts();

    // Remember, the Builder pattern can be used without a Director class.
    console.log('Custom product:');
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}

const director = new Director();
clientCode(director);

```

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

### Factory Example

```typescript
/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
abstract class Creator {
    /**
     * Note that the Creator may also provide some default implementation of the
     * factory method.
     */
    public abstract factoryMethod(): Product;

    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     */
    public someOperation(): string {
        // Call the factory method to create a Product object.
        const product = this.factoryMethod();
        // Now, use the product.
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * Concrete Creators override the factory method in order to change the
 * resulting product's type.
 */
class ConcreteCreator1 extends Creator {
    /**
     * Note that the signature of the method still uses the abstract product
     * type, even though the concrete product is actually returned from the
     * method. This way the Creator can stay independent of concrete product
     * classes.
     */
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * The Product interface declares the operations that all concrete products must
 * implement.
 */
interface Product {
    operation(): string;
}

/**
 * Concrete Products provide various implementations of the Product interface.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * The client code works with an instance of a concrete creator, albeit through
 * its base interface. As long as the client keeps working with the creator via
 * the base interface, you can pass it any creator's subclass.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * The Application picks a creator's type depending on the configuration or
 * environment.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
```

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

### Prototype Example

```typescript
/**
 * The example class that has cloning ability. We'll see how the values of field
 * with different types will be cloned.
 */
class Prototype {
    public primitive: any;
    public component: object;
    public circularReference: ComponentWithBackReference;

    public clone(): this {
        const clone = Object.create(this);

        clone.component = Object.create(this.component);

        // Cloning an object that has a nested object with backreference
        // requires special treatment. After the cloning is completed, the
        // nested object should point to the cloned object, instead of the
        // original object. Spread operator can be handy for this case.
        clone.circularReference = {
            ...this.circularReference,
            prototype: { ...this },
        };

        return clone;
    }
}

class ComponentWithBackReference {
    public prototype;

    constructor(prototype: Prototype) {
        this.prototype = prototype;
    }
}

/**
 * The client code.
 */
function clientCode() {
    const p1 = new Prototype();
    p1.primitive = 245;
    p1.component = new Date();
    p1.circularReference = new ComponentWithBackReference(p1);

    const p2 = p1.clone();
    if (p1.primitive === p2.primitive) {
        console.log('Primitive field values have been carried over to a clone. Yay!');
    } else {
        console.log('Primitive field values have not been copied. Booo!');
    }
    if (p1.component === p2.component) {
        console.log('Simple component has not been cloned. Booo!');
    } else {
        console.log('Simple component has been cloned. Yay!');
    }

    if (p1.circularReference === p2.circularReference) {
        console.log('Component with back reference has not been cloned. Booo!');
    } else {
        console.log('Component with back reference has been cloned. Yay!');
    }

    if (p1.circularReference.prototype === p2.circularReference.prototype) {
        console.log('Component with back reference is linked to original object. Booo!');
    } else {
        console.log('Component with back reference is linked to the clone. Yay!');
    }
}

clientCode();
```

### Prototype Summary

- To implement a prototype, partially construct an object and store somewhere
- Deep copy the prototype
- Customize the resulting instance
- A factory provides a convenient API for using prototypes

## Singleton

A design pattern everybody loves to hate...

"When discussing which patters to drop, we found that we still love them all. (Not really - I'm in favor of dropping Singleton. Its use is almost always a design small.) -- Erich Gamma

- For some components it only makes sense to have one in the system
  - Database repository
  - Object factory
- E.g., the constructor call is expensive
  - We want initialization to only happen once
  - We provide everyone with the same instance
- Want to prevent anyone creating additional copies

### Singleton Definition

A component which is intantiated only once.

### Singleton Example

```typescript
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class Singleton {
    private static instance: Singleton;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    public someBusinessLogic() {
        // ...
    }
}

/**
 * The client code.
 */
function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();
```

### Singleton Summary

- A constructor can choose what to return; we can keep returning same instance
- Monostate: many instances, shared data
- Directly depending on the Singleton is a bad idea; introduce a dependency instead

## Adapter

Getting the interface you want from the interface you have

### Adapter Definition

A contruct which adapts an existing interface X to conform to the required interface Y

### Adapter Example

```typescript
/**
 * The Target defines the domain-specific interface used by the client code.
 */
class Target {
    public request(): string {
        return 'Target: The default target\'s behavior.';
    }
}

/**
 * The Adaptee contains some useful behavior, but its interface is incompatible
 * with the existing client code. The Adaptee needs some adaptation before the
 * client code can use it.
 */
class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}

/**
 * The Adapter makes the Adaptee's interface compatible with the Target's
 * interface.
 */
class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
function clientCode(target: Target) {
    console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
```

### Adapter Summary

- Implementing an Adapter is easy
- Determine the API you have and the API you need
- Create a component which aggregates (has a reference to, ...) the adaptee
- Intermediate representations can pile up: use caching and other optimizations

## Bridge

Conecting components together through abstractions

- Bridge prevents a "Cartesian Product" complexity explosion
- Example:
  - Base class ThreadScheduler
  - Can be preemptive or cooperative
  - Can run on Windows or Unix
  - End up with with a 2x2 scenario:
  WindowsPTS, UnixPTS, WindowsCTS, UnixCTS
- Bridge pattern avoids the entity explosion

## Bridge Definition

A mechanism that decouples an interface (hierarchy) from an implementation (hierarchy)

Reminder: JS has duck typing, so definitions of interfaces are not strictly necessary

### Bridge Example

```typescript
/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }

    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:\n${result}`;
    }
}

/**
 * You can extend the Abstraction without changing the Implementation classes.
 */
class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
}

/**
 * The Implementation defines the interface for all implementation classes. It
 * doesn't have to match the Abstraction's interface. In fact, the two
 * interfaces can be entirely different. Typically the Implementation interface
 * provides only primitive operations, while the Abstraction defines higher-
 * level operations based on those primitives.
 */
interface Implementation {
    operationImplementation(): string;
}

/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
        return 'ConcreteImplementationA: Here\'s the result on the platform A.';
    }
}

class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
        return 'ConcreteImplementationB: Here\'s the result on the platform B.';
    }
}

/**
 * Except for the initialization phase, where an Abstraction object gets linked
 * with a specific Implementation object, the client code should only depend on
 * the Abstraction class. This way the client code can support any abstraction-
 * implementation combination.
 */
function clientCode(abstraction: Abstraction) {
    // ..

    console.log(abstraction.operation());

    // ..
}

/**
 * The client code should be able to work with any pre-configured abstraction-
 * implementation combination.
 */
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log('');

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
```

### Bridge Summary

- Decouple abstraction from implementation
- Both can exist as hierarchies
- A stronger form of encapsulation

## Composite

Treating individual and aggregate objects uniformly

- Objects use other object's fields/methods through inheritance and composition
- Composition lets us make compound objects
  - E.g., a mathematical expression composed of simple expressions; or
  - A shape group made of several different shapes
- Composite design pattern is used to thread both single (scalar) and composite objects uniformly
  - I.e., class *Foo* and a array (containing *Foo's*) having the same API

### Composite Definition

A mechanism for treating individual (scalar) objects and compositions of objects in a uniform manner

### Composition Example

```typescript
/**
 * The base Component class declares common operations for both simple and
 * complex objects of a composition.
 */
abstract class Component {
    protected parent: Component;

    /**
     * Optionally, the base Component can declare an interface for setting and
     * accessing a parent of the component in a tree structure. It can also
     * provide some default implementation for these methods.
     */
    public setParent(parent: Component) {
        this.parent = parent;
    }

    public getParent(): Component {
        return this.parent;
    }

    /**
     * In some cases, it would be beneficial to define the child-management
     * operations right in the base Component class. This way, you won't need to
     * expose any concrete component classes to the client code, even during the
     * object tree assembly. The downside is that these methods will be empty
     * for the leaf-level components.
     */
    public add(component: Component): void { }

    public remove(component: Component): void { }

    /**
     * You can provide a method that lets the client code figure out whether a
     * component can bear children.
     */
    public isComposite(): boolean {
        return false;
    }

    /**
     * The base Component may implement some default behavior or leave it to
     * concrete classes (by declaring the method containing the behavior as
     * "abstract").
     */
    public abstract operation(): string;
}

/**
 * The Leaf class represents the end objects of a composition. A leaf can't have
 * any children.
 *
 * Usually, it's the Leaf objects that do the actual work, whereas Composite
 * objects only delegate to their sub-components.
 */
class Leaf extends Component {
    public operation(): string {
        return 'Leaf';
    }
}

/**
 * The Composite class represents the complex components that may have children.
 * Usually, the Composite objects delegate the actual work to their children and
 * then "sum-up" the result.
 */
class Composite extends Component {
    protected children: Component[] = [];

    /**
     * A composite object can add or remove other components (both simple or
     * complex) to or from its child list.
     */
    public add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    public remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);

        component.setParent(null);
    }

    public isComposite(): boolean {
        return true;
    }

    /**
     * The Composite executes its primary logic in a particular way. It
     * traverses recursively through all its children, collecting and summing
     * their results. Since the composite's children pass these calls to their
     * children and so forth, the whole object tree is traversed as a result.
     */
    public operation(): string {
        const results = [];
        for (const child of this.children) {
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}

/**
 * The client code works with all of the components via the base interface.
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * This way the client code can support the simple leaf components...
 */
const simple = new Leaf();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...as well as the complex composites.
 */
const tree = new Composite();
const branch1 = new Composite();
branch1.add(new Leaf());
branch1.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
tree.add(branch1);
tree.add(branch2);
console.log('Client: Now I\'ve got a composite tree:');
clientCode(tree);
console.log('');

/**
 * Thanks to the fact that the child-management operations are declared in the
 * base Component class, the client code can work with any component, simple or
 * complex, without depending on their concrete classes.
 */
function clientCode2(component1: Component, component2: Component) {
    // ...

    if (component1.isComposite()) {
        component1.add(component2);
    }
    console.log(`RESULT: ${component1.operation()}`);

    // ...
}

console.log('Client: I don\'t need to check the components classes even when managing the tree:');
clientCode2(tree, simple);
```

### Composition Summary

- Objects can use other objects via inheritance/composition
- Some composed and singular objects need similar/identical behaviors
- Composite design pattern lets us treat both types of objects uniformly
- Javascript supports iteration with *Symbol.iterator*
- A single object can make itself iterable by *yielding* **this**

## Decorator

Adding behavior without altering the class itself

- Want to augment an object with additional functionality
- Do not want to rewrite or alter existing code (OCP)
- Want to keep new functionality separate (SRP)
- Need to be able to interact with existing structures
- Two options:
  - Inherit from required object (if possible)
  - Build a decorator, which simply references the decorated object(s)

### Decorator Definition

Facilitates the addition of behaviors to individual objects without inheriting from them

### Decorator Example

```typescript
/**
 * The base Component interface defines operations that can be altered by
 * decorators.
 */
interface Component {
    operation(): string;
}

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

/**
 * The base Decorator class follows the same interface as the other components.
 * The primary purpose of this class is to define the wrapping interface for all
 * concrete decorators. The default implementation of the wrapping code might
 * include a field for storing a wrapped component and the means to initialize
 * it.
 */
class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    /**
     * The Decorator delegates all work to the wrapped component.
     */
    public operation(): string {
        return this.component.operation();
    }
}

/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class ConcreteDecoratorA extends Decorator {
    /**
     * Decorators may call parent implementation of the operation, instead of
     * calling the wrapped object directly. This approach simplifies extension
     * of decorator classes.
     */
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

/**
 * Decorators can execute their behavior either before or after the call to a
 * wrapped object.
 */
class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

/**
 * The client code works with all objects using the Component interface. This
 * way it can stay independent of the concrete classes of components it works
 * with.
 */
function clientCode(component: Component) {
    // ...

    console.log(`RESULT: ${component.operation()}`);

    // ...
}

/**
 * This way the client code can support both simple components...
 */
const simple = new ConcreteComponent();
console.log('Client: I\'ve got a simple component:');
clientCode(simple);
console.log('');

/**
 * ...as well as decorated ones.
 *
 * Note how decorators can wrap not only simple components but the other
 * decorators as well.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log('Client: Now I\'ve got a decorated component:');
clientCode(decorator2);
```

### Decorator Summary

- A decorator keeps the reference to the decorated object(s)
- Add utility fields and methods to augment the object's features
- May or may not forward calls to the underlying object

## Facade

Exposing several components through a single interface

- Balancing complexity and presentation/usability
- Typical home:
  - Many subsystems (electrical, sanitation)
  - Complexity internal structure (e.g., floor layers)
  - End user is not exposed to internals
- Same with software!
  - Many systems working to provide flexibility, but...
  - API consumers want it to 'just works'

### Facade Definition

Provides a simple, easy to understand/user interface over a large and sophisticated body of code.

### Facade Example

```typescript
/**
 * The Facade class provides a simple interface to the complex logic of one or
 * several subsystems. The Facade delegates the client requests to the
 * appropriate objects within the subsystem. The Facade is also responsible for
 * managing their lifecycle. All of this shields the client from the undesired
 * complexity of the subsystem.
 */
class Facade {
    protected subsystem1: Subsystem1;

    protected subsystem2: Subsystem2;

    /**
     * Depending on your application's needs, you can provide the Facade with
     * existing subsystem objects or force the Facade to create them on its own.
     */
    constructor(subsystem1: Subsystem1 = null, subsystem2: Subsystem2 = null) {
        this.subsystem1 = subsystem1 || new Subsystem1();
        this.subsystem2 = subsystem2 || new Subsystem2();
    }

    /**
     * The Facade's methods are convenient shortcuts to the sophisticated
     * functionality of the subsystems. However, clients get only to a fraction
     * of a subsystem's capabilities.
     */
    public operation(): string {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operation1();
        result += this.subsystem2.operation1();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationN();
        result += this.subsystem2.operationZ();

        return result;
    }
}

/**
 * The Subsystem can accept requests either from the facade or client directly.
 * In any case, to the Subsystem, the Facade is yet another client, and it's not
 * a part of the Subsystem.
 */
class Subsystem1 {
    public operation1(): string {
        return 'Subsystem1: Ready!\n';
    }

    // ...

    public operationN(): string {
        return 'Subsystem1: Go!\n';
    }
}

/**
 * Some facades can work with multiple subsystems at the same time.
 */
class Subsystem2 {
    public operation1(): string {
        return 'Subsystem2: Get ready!\n';
    }

    // ...

    public operationZ(): string {
        return 'Subsystem2: Fire!';
    }
}

/**
 * The client code works with complex subsystems through a simple interface
 * provided by the Facade. When a facade manages the lifecycle of the subsystem,
 * the client might not even know about the existence of the subsystem. This
 * approach lets you keep the complexity under control.
 */
function clientCode(facade: Facade) {
    // ...

    console.log(facade.operation());

    // ...
}

/**
 * The client code may have some of the subsystem's objects already created. In
 * this case, it might be worthwhile to initialize the Facade with these objects
 * instead of letting the Facade create new instances.
 */
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
```

### Facade Summary

- Build a Facade to provide a simplified API over a set of classes
- May wish to (optionally) expose internals through the facade

## Flyweight

Space optimization!

- Avoid redundancy when storing data
- E.g., MMORPG
  - Plenty of users with identical first/last names
  - No sense in storing same first/last name over and over again
  - Store a list of names and references to them
- E.g., bold or italic text formatting
  - Don't want each character to have a formatting character
  - Operate on *ranges* (e.g., line numbers, start/end positions)

### Flyweight Definition

A space optimization technique that let's us use less memory by storing externally the data associated with similar objects.

### Flyweight Example

```typescript
/**
 * The Flyweight stores a common portion of the state (also called intrinsic
 * state) that belongs to multiple real business entities. The Flyweight accepts
 * the rest of the state (extrinsic state, unique for each entity) via its
 * method parameters.
 */
class Flyweight {
    private sharedState: any;

    constructor(sharedState: any) {
        this.sharedState = sharedState;
    }

    public operation(uniqueState): void {
        const s = JSON.stringify(this.sharedState);
        const u = JSON.stringify(uniqueState);
        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
    }
}

/**
 * The Flyweight Factory creates and manages the Flyweight objects. It ensures
 * that flyweights are shared correctly. When the client requests a flyweight,
 * the factory either returns an existing instance or creates a new one, if it
 * doesn't exist yet.
 */
class FlyweightFactory {
    private flyweights: {[key: string]: Flyweight} = <any>{};

    constructor(initialFlyweights: string[][]) {
        for (const state of initialFlyweights) {
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    /**
     * Returns a Flyweight's string hash for a given state.
     */
    private getKey(state: string[]): string {
        return state.join('_');
    }

    /**
     * Returns an existing Flyweight with a given state or creates a new one.
     */
    public getFlyweight(sharedState: string[]): Flyweight {
        const key = this.getKey(sharedState);

        if (!(key in this.flyweights)) {
            console.log('FlyweightFactory: Can\'t find a flyweight, creating new one.');
            this.flyweights[key] = new Flyweight(sharedState);
        } else {
            console.log('FlyweightFactory: Reusing existing flyweight.');
        }

        return this.flyweights[key];
    }

    public listFlyweights(): void {
        const count = Object.keys(this.flyweights).length;
        console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
        for (const key in this.flyweights) {
            console.log(key);
        }
    }
}

/**
 * The client code usually creates a bunch of pre-populated flyweights in the
 * initialization stage of the application.
 */
const factory = new FlyweightFactory([
    ['Chevrolet', 'Camaro2018', 'pink'],
    ['Mercedes Benz', 'C300', 'black'],
    ['Mercedes Benz', 'C500', 'red'],
    ['BMW', 'M5', 'red'],
    ['BMW', 'X6', 'white'],
    // ...
]);
factory.listFlyweights();

// ...

function addCarToPoliceDatabase(
    ff: FlyweightFactory, plates: string, owner: string,
    brand: string, model: string, color: string,
) {
    console.log('\nClient: Adding a car to database.');
    const flyweight = ff.getFlyweight([brand, model, color]);

    // The client code either stores or calculates extrinsic state and passes it
    // to the flyweight's methods.
    flyweight.operation([plates, owner]);
}

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'M5', 'red');

addCarToPoliceDatabase(factory, 'CL234IR', 'James Doe', 'BMW', 'X1', 'red');

factory.listFlyweights();
```

### Flyweight Summary

- Store common data externally
- Specify an index or a reference into the external data store
- Define the ide of "ranges"on homogeneous collections and store data related to those ranges

## Bibliography

All code examples in this README are part of [refactoring.guru](https://refactoring.guru/es/design-patterns)