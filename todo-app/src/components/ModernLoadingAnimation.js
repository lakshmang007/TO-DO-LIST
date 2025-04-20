import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function ModernLoadingAnimation() {
  const [progress, setProgress] = useState(0);
  const [showInitial, setShowInitial] = useState(true);
  
  useEffect(() => {
    // Animate progress from 0 to 100
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      
      return () => clearInterval(interval);
    }, 500);
    
    // Hide initial screen after animation completes
    const initialTimer = setTimeout(() => {
      setShowInitial(false);
    }, 2500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(initialTimer);
    };
  }, []);
  
  return (
    <div className="modern-loading-container">
      {showInitial ? (
        <motion.div 
          className="initial-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="logo-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo">S</div>
          </motion.div>
          
          <motion.div 
            className="progress-container"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "300px", opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </motion.div>
          
          <motion.div 
            className="loading-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Loading your workspace...
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          className="loading-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
          <div className="loading-message">Preparing your tasks...</div>
        </motion.div>
      )}
    </div>
  );
}

export default ModernLoadingAnimation;
