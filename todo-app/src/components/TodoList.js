// TodoList.js
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import UserHeader from './UserHeader';
import { motion, AnimatePresence } from 'framer-motion';

function TodoList({ username, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  // Rules are now static and will always show
  const showRules = true;

  // Load todos from localStorage when component mounts
  useEffect(() => {
    const savedTodos = localStorage.getItem(`studyNote_todos_${username}`);
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error parsing saved todos:', error);
      }
    }
  }, [username]);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`studyNote_todos_${username}`, JSON.stringify(todos));
  }, [todos, username]);

  const handleAdd = () => {
    if (input.trim() === "") return;

    // Create new task
    const newTodo = {
      text: input,
      time: timeInput,
      id: Date.now(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([...todos, newTodo]);
    setInput("");
    setTimeInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleDelete = (idToDelete) => {
    setTodos(todos.filter(todo => todo.id !== idToDelete));
  };

  const handleUpdateTodo = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-corner corner-top-right"></div>
      <div className="page-corner corner-bottom-right"></div>

      <UserHeader username={username} onLogout={onLogout} />

      <AnimatePresence>
        {showRules && (
          <motion.div
            className="rules-container"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="rules-title">Study Note Rules</h3>
            <div className="rules-text">
              <p>I. The task written in this note shall be completed without fail.</p>
              <p>II. This note will not take effect unless the writer has a clear goal in mind when writing the task.</p>
              <p>III. If the time of completion is written, the task must be finished by that exact time.</p>
              <p>IV. If the time is not specified, the task must be completed within 24 hours.</p>
              <p>V. Once a task is checked off, the knowledge gained shall remain with you forever.</p>
              <p>VI. Procrastination is forbidden. The owner of this note must work diligently.</p>
              <p>VII. Failure to complete tasks will result in lost opportunities for success.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="todo-container">
        <div className="input-container">
          <div className="input-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Write a name... or just a task"
            />
          </div>
          <div className="input-row">
            <div className="time-input-container">
              <label htmlFor="time-input" className="time-label">Completion Time:</label>
              <input
                id="time-input"
                type="time"
                value={timeInput}
                onChange={(e) => setTimeInput(e.target.value)}
              />
            </div>
            <button onClick={handleAdd}>Add to Study Note</button>
          </div>
        </div>

        <AnimatePresence>
          {todos.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              style={{ textAlign: 'center', fontStyle: 'italic', marginTop: '30px' }}
            >
              The Study Note is empty...
            </motion.p>
          ) : (
            <div>
              {todos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={{...todo, onUpdate: handleUpdateTodo}}
                  onDelete={() => handleDelete(todo.id)}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default TodoList;
