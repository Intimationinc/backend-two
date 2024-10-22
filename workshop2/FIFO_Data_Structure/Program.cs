using FIFO_Data_Structure;

CustomQueue<int> queue = new CustomQueue<int>();

while (true)
{
    Console.WriteLine("Enter specific number for operation: ");
    Console.WriteLine("Enter 1 : Add value to the queue");
    Console.WriteLine("Enter 2 : Remove value from the queue");
    Console.WriteLine("Enter 3 : See count of values stored in the queue");
    Console.WriteLine("Enter any other key to exit.");

    if (!int.TryParse(Console.ReadLine(), out int n))
    {
        Console.WriteLine("Invalid input. Exiting program.");
        break;
    }

    switch (n)
    {
        case 1:
            Console.WriteLine("Enter value to add to the queue:");
            if (int.TryParse(Console.ReadLine(), out int value))
            {
                queue.Enqueue(value);
                Console.WriteLine($"Value {value} added to the queue.");
            }
            else
            {
                Console.WriteLine("Invalid input. Please enter a valid integer.");
            }
            break;

        case 2:
            if (queue.Count() > 0)
            {
                int removedValue = queue.Dequeue();
                Console.WriteLine($"Value {removedValue} removed from the queue.");
            }
            else
            {
                Console.WriteLine("Queue is empty. Cannot remove any value.");
            }
            break;

        case 3:
            Console.WriteLine($"The queue contains {queue.Count} values.");
            break;

        default:
            Console.WriteLine("Exiting program.");
            return;
    }
}
