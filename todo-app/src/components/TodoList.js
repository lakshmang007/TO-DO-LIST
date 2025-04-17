// TodoList.js
import React, { useState } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim() === "") return;
    setTodos([...todos, input]);
    setInput("");
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <TodoItem key={index} text={todo} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
