import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function LoadingAnimation() {
  const [showCover, setShowCover] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCover(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showCover ? (
        <motion.div
          className="death-note-cover"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <div className="death-note-title">STUDY NOTE</div>
        </motion.div>
      ) : (
        <motion.div
          className="loading-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="loading-text">Preparing your Study Note...</div>
          <div className="loading-animation"></div>
          <motion.p
            className="loading-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Your path to knowledge awaits...
          </motion.p>
        </motion.div>
      )}
    </>
  );
}

export default LoadingAnimation;
