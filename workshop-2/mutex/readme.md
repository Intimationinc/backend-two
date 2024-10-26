# Mutex (Mutual Exclusion)

Used to ensure that only one thread can access a shared resource at a time, preventing race conditions in multi-threaded programs.
Python’s threading module provides a Lock class that acts as a mutex.

# RWMutex

An RWMutex allows multiple threads to read a shared resource simultaneously but only one thread to write, preventing readers from accessing the resource during a write.

# Semaphore

A semaphore is a synchronization primitive used in programming to control access to a shared resource by multiple threads. It allows threads to manage concurrent access by maintaining a counter that represents the number of "permits" available for access. Semaphores are often used when you need to limit the number of threads that can access a resource simultaneously, which is especially helpful in limiting access to a pool of resources like database connections, file handles, or network connections.

Counter: The semaphore maintains a counter that indicates the number of threads that can acquire it at any given time. For example:

Binary Semaphore: Only two values (0 and 1), similar to a mutex.
Counting Semaphore: Can take any integer value, controlling multiple concurrent accesses.
Acquire and Release:

Acquire: When a thread tries to access the resource, it calls acquire(), which decreases the counter by one.
If the counter is greater than zero, the thread gains access.
If the counter is zero, the thread is blocked until another thread releases the semaphore.
Release: When a thread finishes using the resource, it calls release(), increasing the counter by one. This allows another waiting thread to acquire the semaphore.

# LRU (Least Recently Used) Cache

An LRU (Least Recently Used) Cache is a data structure that stores a fixed number of elements and evicts the least recently accessed item when the cache reaches its limit. It is a useful structure for optimizing memory and improving performance in scenarios like caching results of expensive function calls.

# Atomic operation

An atomic operation is an indivisible unit of work that executes entirely without interruption, ensuring that no other operations can interfere with its execution. In multithreading and multiprocessing contexts, atomic operations are crucial for maintaining data consistency, especially when multiple threads or processes may access and modify shared resources simultaneously.

Characteristics of Atomic Operations
Indivisibility: The operation is completed in a single step from the perspective of other threads or processes.
No Interference: During an atomic operation, no other thread can observe an intermediate or partial state.
Thread Safety: Atomic operations prevent race conditions, where the outcome depends on the timing of threads.

If a task involves only incrementing a counter in a thread-safe way, an atomic operation would be efficient and sufficient. But if the task involves reading a value, making a decision based on it, and then updating it, you would need a mutex to ensure that no other thread modifies the value during that process.
