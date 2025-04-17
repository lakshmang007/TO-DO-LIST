import React from 'react';
import { motion } from 'framer-motion';

function UserHeader({ username, onLogout }) {
  // Get the first letter of the username for the avatar
  const avatarLetter = username ? username.charAt(0).toUpperCase() : 'U';
  
  return (
    <motion.div 
      className="user-header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="user-info">
        <div className="user-avatar">
          {avatarLetter}
        </div>
        <div className="user-name">
          Welcome, <strong>{username}</strong>
        </div>
      </div>
      
      <button 
        className="logout-button"
        onClick={onLogout}
      >
        Logout
      </button>
    </motion.div>
  );
}

export default UserHeader;
