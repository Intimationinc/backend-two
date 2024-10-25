int[] jobs = new int[10]
{
    100, 200, 300, 400, 500, 600, 700, 800, 900, 1000
};

Console.WriteLine("Starting to process the queues...");
ProcessQueue();
Console.WriteLine("All jobs have been processed.");

void ProcessQueue()
{
    Semaphore semaphore = new Semaphore(3, 3);
    List<Thread> threads = new List<Thread>();

    foreach (int job in jobs)
    {
        Thread th = new Thread(() => Worker(job, semaphore));
        threads.Add(th);
        th.Start();
    }

    foreach (Thread thread in threads)
    {
        thread.Join();  // Wait for all threads to finish
    }
}

void Worker(int job, Semaphore semaphore)
{
    semaphore.WaitOne();  // Wait for permission to proceed
    try
    {
        Console.WriteLine($"Processing job {job}");
        Thread.Sleep(5 * 1000);
        Console.WriteLine($"Processed job {job}");
    }
    finally
    {
        semaphore.Release();  // Release the semaphore
    }
}
