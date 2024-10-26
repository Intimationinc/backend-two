import threading
import time

# Create a semaphore with 2 permits (max 2 threads can access at once)
semaphore = threading.Semaphore(2)


def access_resource(thread_id):
    print(f"Thread {thread_id} waiting to access the resource")
    semaphore.acquire()  # Decrement the semaphore counter
    try:
        print(f"Thread {thread_id} has accessed the resource")
        time.sleep(1)  # Simulate some work
    finally:
        print(f"Thread {thread_id} is releasing the resource")
        semaphore.release()  # Increment the semaphore counter


# Create and start multiple threads
threads = [threading.Thread(target=access_resource, args=(i,))
           for i in range(5)]

for t in threads:
    t.start()

for t in threads:
    t.join()

print("All threads have completed.")
