class Mutex {
  constructor() {
    this.lock = false; // Indicates if the lock is currently held
    this.queue = []; // Queue for waiting persons
  }

  locks(nextPerson) {
    return new Promise((resolve) => {
      const tryLock = () => {
        if (!this.lock) {
          this.lock = true; // Acquire the lock
          console.log(`${nextPerson} has acquired the lock.`);
          resolve(); // Resolve the promise to continue
        } else {
          console.log(`${nextPerson} is waiting for the lock.`);
          this.queue.push({ nextPerson, func: tryLock }); // Add to queue
        }
      };

      tryLock(); // Try to acquire the lock immediately
    });
  }

  unlock(nextPerson) {
    console.log(`${nextPerson} is releasing the lock.`);
    this.lock = false; // Release the lock

    // Check if there are any waiting persons in the queue
    if (this.queue.length > 0) {
      const next = this.queue.shift(); // Get the next person in line
      console.log(`${next.nextPerson} is next in line to acquire the lock.`);
      next.func(); // Attempt to acquire the lock for the next person
    }
  }
}

// Counter class
class Counter {
  constructor() {
    this.num = 0; // Counter starts at 0
    this.mutex = new Mutex(); // Create a new Mutex instance
  }

  async increment(nextPerson) {
    await this.mutex.locks(nextPerson); // Wait to acquire the lock
    this.num += 1; // Critical section: safely incrementing the number
    console.log(`${nextPerson} incremented the counter to ${this.num}`);
    this.mutex.unlock(nextPerson); // Release the lock
    return this.num; // Return the updated value
  }

  async decrement(nextPerson) {
    await this.mutex.locks(nextPerson); // Wait to acquire the lock
    if (this.num > 0) {
      this.num -= 1; // Critical section: safely decrementing the number
    }
    console.log(`${nextPerson} decremented the counter to ${this.num}`);
    this.mutex.unlock(nextPerson); // Release the lock
    return this.num; // Return the updated value
  }

  getNum() {
    return this.num; // Return the current value of the counter
  }
}

// Example usage
(async () => {
  const counter = new Counter();
  
  // Simulating concurrent increments and decrements
  await Promise.all([
    counter.increment('Person 1'),
    counter.increment('Person 2'),
    counter.increment('Person 3'),
    counter.decrement('Person 4'),
    counter.increment('Person 5'),
  ]);
  
  console.log(`Final counter value: ${counter.getNum()}`);
})();
