import React, { useState, useEffect } from 'react'
import axios from 'axios';
import TodoList from "../components/TodoList";

const Post = () => {
  const [todos, setTodos] = useState(null);

  const onUpdateTodo = (todo) => {
    const todoItemIndex = todos.findIndex((x) => x.id === todo.id);
    const newTodos = [...todos];

    const newTodo = newTodos[todoItemIndex];
    newTodo.completed = !newTodo.completed;
    newTodos[todoItemIndex] = newTodo;
    setTodos(newTodos);
  };

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((result) => {
      setTodos(result.data);
    });
  }, []);

  return (
    <div>
      {todos && <TodoList todos={todos} onUpdateTodo={onUpdateTodo} />}
    </div>
  );
}

export default Post