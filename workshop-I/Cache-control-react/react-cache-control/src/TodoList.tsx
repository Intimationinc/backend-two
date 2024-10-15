import useTodos from "./hooks/useTodos";

const TodoList = () => {
  const { data: todos, dataUpdatedAt, error, isLoading } = useTodos();
  const date = new Date(dataUpdatedAt);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <p>dataUpdatedAt: {date.toLocaleString()}</p>
      <ul className="list-group">
        {todos?.map((todo) => (
          <li key={todo.id} className="list-group-item">
            {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
