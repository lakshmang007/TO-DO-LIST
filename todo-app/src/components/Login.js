import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate authentication delay
    setTimeout(() => {
      // Simple authentication - in a real app, this would validate against a backend
      if (password.length < 4) {
        setError('Password must be at least 4 characters');
        setIsLoading(false);
        return;
      }
      
      // Store user info in localStorage
      localStorage.setItem('studyNoteUser', JSON.stringify({ 
        username,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      }));
      
      // Call the onLogin callback with the username
      onLogin(username);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div 
      className="login-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-header">
        <h2>STUDY NOTE</h2>
        <p>Enter your credentials to access your tasks</p>
      </div>
      
      <form onSubmit={handleSubmit} className="login-form">
        {error && <div className="login-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="login-footer">
        <p>* Your tasks will be saved to this device</p>
      </div>
    </motion.div>
  );
}

export default Login;
