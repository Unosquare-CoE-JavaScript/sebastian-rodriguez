# Angular Production Grade

## Managing Complexity

"Managing complexity is the hardest thing about developing software"

When a program grows in size, it grows in complexity and not linear.

Complexity consists of **managing of state, flow control,** and **code volume**

### General rules

- There is not silver bullet
- Make it **work**
- Make it ***known***
- Make it **right**
- make it **fast**
- Code should **do one thing**
- Code should be **self documenented**
- Favor **pure, immutable functions**
- Abstractions should **reduce complexity**
- Abstractions should **reduce coupling**
- Abstractions should **increase cohesion**. Functional cohesion.
- Abstractions should **increase portability**
- Refactor through **promotion**
- **Composition** over inheritance
- Do not confuse **convention** for **repetition**. Same thing vs same way.
- **Well-structured code** will naturally have a **larger surface area**

### Teams rules

- Be mindful over the **limitations of your entire team** and optimize around that
- **Favor best practices** over introducing idioms however clever they may be
- **Consistency** is better that **righteousness**
- **Follow the style guide** until it doesn't make sense for your situation

### Tactical rules

- Eliminate **hidden state** in functions
- Eliminate **nested logic** in functions
- Do not breal the **Single Responsibility Principle**
- **Extracting to a method** is one of the most effective refactoring strategies available
- If you need to **clarify your code with comments** then it is *probably* too complex
- It's *impossible* to write **good tests** for **bad code**

## Managing Angular Complexity

- Your routing table will generally describe your features.
- A feature will generally get a route
- A route will navigate to a container component
- Everything inside that container component should be a presentation component
- A component should only ever do two things:
  - Consume just enough data to satisfy its templates
  - Capture user events and delegate them upwards
- Components should be as thin as possible
- Container components should satisfy inputs using the async pipe
- Components should be oblivious to bussiness logic
- Components should be oblivious to server communication
- Components should be oblivious to application state
- Fecades are an effective delegation layer between components and the rest of the app
- Fecades are for delegation only
- Server communication and state management should be decoupled
- Data models should be decoupled especially inside of a monorepo and API projects
- Do not unnecessarily optimize until you have a good reason to do so
  - For instance, a component should not become a lib until it is going to be used in more than one app

## Data Modeling

The data model enable the developer to know how the data is. That means we can infer many things based on the model of the data enabling decouple banckend and frontend teams.

## Facades

The facade pattern (also spelled façade) is a software-design pattern commonly used in object-oriented programming. Analogous to a facade in architecture, a facade is an object that serves as a front-facing interface masking more complex underlying or structural code. A facade can:

- improve the readability and usability of a software library by masking interaction with more complex components behind a single (and often simplified) API
- provide a context-specific interface to more generic functionality (complete with context-specific input validation)
- serve as a launching point for a broader refactor of monolithic or tightly-coupled systems in favor of more loosely-coupled code

Developers often use the facade design pattern when a system is very complex or difficult to understand because the system has many interdependent classes or because its source code is unavailable. This pattern hides the complexities of the larger system and provides a simpler interface to the client. It typically involves a single wrapper class that contains a set of members required by the client. These members access the system on behalf of the facade client and hide the implementation details.

### Comments

- Facades are **controversial** and can be misused
- Facades are a **pure delegation layer** and should NOT handle business logic
- Facades provide a **clean separation** between components and the rest of your application
- Just as inputs and outputs provide and **API for your components**, facades provide an **API for your application**
- Facades are an excellent way to **incrementally integrate NgRx**
- Facaes are great for **mocking** out a **business logic layer**
