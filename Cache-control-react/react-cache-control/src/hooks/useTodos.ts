import axios from 'axios';
import { useQuery } from "@tanstack/react-query";
export interface Todo {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }
const useTodos = () => {
    const fetchTodos = () =>
        axios
          .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
          .then((res) => res.data);
    return useQuery<Todo[], Error>({
        queryKey: ["todos"],
        queryFn: fetchTodos,
        staleTime: 60 * 1000, //60 sec for fresh data (similar to max-age)
        cacheTime: 86000 * 1000, // cache stored for 1 day (similar to s-maxage)
        refetchOnMount: false, // Don't refetch on mount
        refetchOnWindowFocus: false, // Do not refetch on window focus
        refetchInterval: 300 * 1000, // Revalidate data after 5 minutes (300 seconds)
      });
}

export default useTodos