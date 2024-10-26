import threading
import time

# Create a Lock object, which will act as a mutex
mutex = threading.Lock()

# Shared resource
counter = 0

# Function to increment counter safely
def increment():
    global counter
    # Lock the mutex to prevent other threads from accessing the code block
    mutex.acquire()
    try:
        local_counter = counter
        time.sleep(0.1)  # Simulate some work
        local_counter += 1
        counter = local_counter
    finally:
        # Always release the lock after the critical section
        mutex.release()

# Create multiple threads that will increment the counter
threads = [threading.Thread(target=increment) for _ in range(10)]

# Start all threads
for thread in threads:
    thread.start()

# Wait for all threads to complete
for thread in threads:
    thread.join()

print("Final counter value:", counter)
