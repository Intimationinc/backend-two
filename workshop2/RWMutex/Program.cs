var sharedCounter = 0;

var rwLock = new ReaderWriterLockSlim();

var tasks = new List<Task>();
for (var i = 0; i < 5; i++)
{
    tasks.Add(Task.Run(ReadWithRwMutex));
    tasks.Add(Task.Run(WriteWithRwMutex));
}

await Task.WhenAll(tasks);

Console.WriteLine("All tasks completed");

void ReadWithRwMutex()
{
    rwLock.EnterReadLock();
    try
    {
        Console.WriteLine($"Reading data by {Environment.CurrentManagedThreadId}");
        Console.WriteLine($"Counter value: {sharedCounter}");
        Task.Delay(TimeSpan.FromSeconds(3));
    }
    finally
    {
        Console.WriteLine($"Read lock releasing for {Environment.CurrentManagedThreadId}");
        rwLock.ExitReadLock();
    }
}

void WriteWithRwMutex()
{
    rwLock.EnterWriteLock();
    try
    {
        Console.WriteLine($"Writing data by {Environment.CurrentManagedThreadId}");
        sharedCounter++;
        Task.Delay(TimeSpan.FromSeconds(3));
    }
    finally
    {
        Console.WriteLine($"Write lock releasing for {Environment.CurrentManagedThreadId}");
        rwLock.ExitWriteLock();
    }
}