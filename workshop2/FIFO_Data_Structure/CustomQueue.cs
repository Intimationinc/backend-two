namespace FIFO_Data_Structure;

public class CustomQueue<T>
{
    private readonly List<T> values;
    private int headIndex;
    private int tailIndex;

    public CustomQueue()
    {
        values = new List<T>();
        headIndex = 0;
        tailIndex = 0;
    }

    public void Enqueue(T value)
    {
        if (values.Count == tailIndex)
            values.Add(value);
        values[tailIndex++] = value;
    }

    public T Dequeue()
    {
        if (headIndex == tailIndex) throw new IndexOutOfRangeException();
        return values[headIndex++];
    }

    public int Count()
    {
        return tailIndex - headIndex;
    }
}
