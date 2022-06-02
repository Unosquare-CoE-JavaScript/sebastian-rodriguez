# Building Distributed Systems in Go

## Evolution of System Architectures

- Mainframes: Terminal > Computer
- Personal Computer: Computer
- Web Applications: Client > Server
- Distributed Applications: Client > Gateway > Backend Services

## Distributed System/Applications

### Characteristics

- **Service Discovery:** Multiple systems interacting with each other and those services should be decoupled as possible. BUT those service can find other services. The distributed systems have to have some mechanism to let other services discover services that they need, and when the service starts up, it needs to be able to broadcast that it's there.
- **Load Balancing:** Distribute the incoming request through available services and enable more if it's necessary
- **Distributed tracing and logging:** Centralize logging for all services and the tracing it's the ability to follow the original request from the original service to other services until response
- **Service Monitoring:** The hability to know when a service it's available and when not and restart if it's necessary

### Types

- **Hub and Spoke:** Some central service that coordinates other services and all of those services are going to communicate with that central service when they get started.
  - **PRO:** Good for load balancing
  - **PRO:** Centralized tracing and logging
  - **CON:** Single Point of Failure
  - **CON:** Hub as multiple roles
- **Peer to Peer:** It needs some mechanis where evary peer service has te ability to let other services know when it starts up and shuts down, and they communicate directly with one another
  - **PRO:** No single point of failure
  - **PRO:** highly decoupled
  - **CON:** Service discovery can be hard
  - **CON:** Load balancing can be tricky
- **Message Queues:**: Instead of communicate directly with one another we have some sort of a message queuing systems and then all of our services send their messages into the message queues
  - **PRO:** Easy to scale
  - **PRO:** Message persistance
  - **CON:** Single point of failure
  - **CON:** Difficult to Configure
- **Hybrid:** A lot of real-world systems fit into this hybrid model because we have some sort of a mixture.
  - **PRO:** Good for load balancing
  - **PRO:** More robust against service failure
  - **CON:** Complex architecture
  - **CON:** Central service subject to scope creep

### Architectual Elements

- **Languages:** One or mutiple
- **Frameworks:** None, one or multiple
  - Are architectures compatible?
  - Do tey support required transports and protocols?
  - How stable are they? Are they easy to upgrade?
- **Transport:** How they will communicate
  - HTTP?
  - gRPC?
  - Other RPC?
  - Mixed?
- **Protocol:** Available protocols for communication
  - Language specific? E.g., encoding/gob
  - JSON?
  - Protocol Buffers?
  - XML/SOAP/...?
  - Mixed
