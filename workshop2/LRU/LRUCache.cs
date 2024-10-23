namespace LRU;

public class LRUCache<K, V>
{
    private readonly int capacity;
    private readonly LinkedList<KeyValuePair<K, V>> cacheList;
    private readonly Dictionary<K, LinkedListNode<KeyValuePair<K, V>>> cacheMap;

    public LRUCache(int capacity)
    {
        this.capacity = capacity;
        this.cacheList = new LinkedList<KeyValuePair<K, V>>();
        this.cacheMap = new Dictionary<K, LinkedListNode<KeyValuePair<K, V>>>();
    }

    public V Get(K key)
    {
        if (cacheMap.ContainsKey(key))
        {
            var node = cacheMap[key];
            cacheList.Remove(node);
            cacheList.AddFirst(node);

            return node.Value.Value;
        }
        else
        {
            throw new KeyNotFoundException();
        }
    }

    public void Set(K key, V value)
    {
        if (cacheMap.ContainsKey(key))
        {
            var node = cacheMap[key];
            cacheList.Remove(node);
        }
        else if (cacheList.Count >= capacity)
        {
            var node = cacheList.Last;
            cacheMap.Remove(node.Value.Key);
            cacheList.RemoveLast();
        }

        var newItem = new KeyValuePair<K, V>(key, value);
        var newNode = new LinkedListNode<KeyValuePair<K, V>>(newItem);
        cacheList.AddFirst(newNode);
        cacheMap[key] = newNode;
    }

    public void DisplayCache()
    {
        foreach (var item in cacheList)
        {
            Console.WriteLine($"Key: {item.Key}, Value: {item.Value}");
        }
    }
}
