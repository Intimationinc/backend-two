import threading
import time


class RWMutex:
    def __init__(self):
        self.readers = 0
        self.lock = threading.Lock()       # For exclusive write access
        self.readers_lock = threading.Lock()  # To manage readers count

    def acquire_read(self):
        with self.readers_lock:
            self.readers += 1
            if self.readers == 1:          # First reader locks the resource for reading
                self.lock.acquire()

    def release_read(self):
        with self.readers_lock:
            self.readers -= 1
            if self.readers == 0:          # Last reader releases the resource
                self.lock.release()

    def acquire_write(self):
        self.lock.acquire()                # Writers acquire exclusive access

    def release_write(self):
        self.lock.release()                # Writers release exclusive access


# Shared resource and RWMutex instance
shared_data = 0
rwmutex = RWMutex()


def reader(id):
    while True:
        rwmutex.acquire_read()
        try:
            print(f"Reader {id} reads data: {shared_data}")
            time.sleep(0.1)
        finally:
            rwmutex.release_read()
        time.sleep(0.2)


def writer(id):
    global shared_data
    while True:
        rwmutex.acquire_write()
        try:
            shared_data += 1
            print(f"Writer {id} updates data to: {shared_data}")
            time.sleep(0.2)
        finally:
            rwmutex.release_write()
        time.sleep(0.3)


# Creating multiple readers and writers
reader_threads = [threading.Thread(target=reader, args=(i,)) for i in range(3)]
writer_threads = [threading.Thread(target=writer, args=(i,)) for i in range(2)]

# Starting all threads
for t in reader_threads + writer_threads:
    t.start()

# Joining all threads
for t in reader_threads + writer_threads:
    t.join()
