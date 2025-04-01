# Node Parallelism Roadmap

## Node process

- Single thread for JavaScript code
- A thread pool for I/O
- A couple more of threads for garbage collection and other stuff

## Event loop 101

- Async calls are sent to the end of the execution queue
- There is only a single thread to deal with the event loop
- Concurrent, but not parallel

## Workers

### BullMQ

- BullMQ Worker abstraction
- Does not spawn a new process neither a new thread
- CAN spawn a new process

