from collections import OrderedDict


class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        # If the key exists, return the value and move the item to the end to mark it as recently used
        if key in self.cache:
            value = self.cache.pop(key)
            self.cache[key] = value  # Reinsert to mark as recently used
            return value
        return -1  # Return -1 if the key is not in the cache

    def put(self, key: int, value: int) -> None:
        # If the key exists, remove it to update its position
        if key in self.cache:
            self.cache.pop(key)
        # If the cache is at capacity, remove the oldest item (first inserted)
        elif len(self.cache) >= self.capacity:
            # Pop the first item (least recently used)
            self.cache.popitem(last=False)
        # Insert the item as the most recently used
        self.cache[key] = value


# Testing the LRU Cache
cache = LRUCache(3)

# Perform some operations
cache.put(1, 1)
cache.put(2, 2)
cache.put(3, 3)
print(cache.get(1))  # Returns 1
cache.put(4, 4)      # Evicts key 2
print(cache.get(2))  # Returns -1 (not found)
print(cache.get(3))  # Returns 3
cache.put(5, 5)      # Evicts key 1
print(cache.get(1))  # Returns -1 (not found)
print(cache.get(4))  # Returns 4
print(cache.get(5))  # Returns 5
