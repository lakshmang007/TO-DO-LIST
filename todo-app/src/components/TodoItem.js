// TodoItem.js
import React from 'react';
import { motion } from "framer-motion";

function TodoItem({ text }) {
  return (
    <motion.div
      className="todo-item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p>{text}</p>
    </motion.div>
  );
}

export default TodoItem;
