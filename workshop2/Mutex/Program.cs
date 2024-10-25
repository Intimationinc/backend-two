

Console.WriteLine("Type 1 to use mutex or type 2 to use without mutex");
int choice = Convert.ToInt32(Console.ReadLine());

int counter = 0;

Mutex mutex = new Mutex();

for (int i = 0; i < 5; i++)
{
    Thread t = new Thread(choice == 1 ? IncrementCounterWithMutex : IncrementCounterWithoutMutex);

    t.Start();
    t.Join();
}

Console.WriteLine($"After all thread completion, now counter is {counter}");


void IncrementCounterWithoutMutex()
{
    for (int i = 0; i < 5; i++)
    {
        counter++;
        Thread.Sleep(500);
    }
}

void IncrementCounterWithMutex()
{
    for (int i = 0; i < 5; i++)
    {
        mutex.WaitOne();
        counter++;
        Thread.Sleep(500);
        mutex.ReleaseMutex();
    }
}