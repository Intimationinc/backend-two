using LRU;

LRUCache<int, string> lruCache = new LRUCache<int, string>(3);

lruCache.Set(1, "Item 1");
lruCache.Set(2, "Item 2");
lruCache.Set(3, "Item 3");

Console.WriteLine("Initial Cache:");
lruCache.DisplayCache();

lruCache.Get(2);

Console.WriteLine("\nCache after accessing key 2:");
lruCache.DisplayCache();

lruCache.Set(4, "Item 4");

Console.WriteLine("\nCache after adding key 4:");
lruCache.DisplayCache();
