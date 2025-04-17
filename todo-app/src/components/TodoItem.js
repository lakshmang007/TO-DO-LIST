// TodoItem.js
import React, { useState } from 'react';
import { motion } from "framer-motion";

function TodoItem({ todo, onDelete }) {
  const [isChecked, setIsChecked] = useState(todo.completed || false);
  const { text, time } = todo;

  // Format the time for display
  const formattedTime = time && time !== '' ? (
    <span className="todo-time">{time} - Task must be completed by this time</span>
  ) : null;

  const handleCheckChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);

    // Update the todo in the parent component
    if (todo.onUpdate) {
      todo.onUpdate({ ...todo, completed: newCheckedState });
    }
  };

  return (
    <motion.div
      className={`todo-item ${isChecked ? 'completed' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ x: 5 }}
      layout
    >
      <div className="todo-item-header">
        <div className="todo-content">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckChange}
              className="death-note-checkbox"
            />
            <span className="checkmark"></span>
          </label>
          <p className={isChecked ? 'completed-text' : ''}>{text}</p>
        </div>
        <motion.button
          className="delete-btn"
          onClick={onDelete}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ✗
        </motion.button>
      </div>

      {formattedTime}

      <motion.div
        style={{
          height: '2px',
          background: '#4a0000',
          marginTop: '10px',
          transformOrigin: 'left'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
    </motion.div>
  );
}

export default TodoItem;
