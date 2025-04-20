import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function BloodLoadingAnimation() {
  const [showCover, setShowCover] = useState(true);
  const [bloodDrops, setBloodDrops] = useState([]);
  const [showText, setShowText] = useState(false);

  // Generate random blood drops
  useEffect(() => {
    const drops = [];
    for (let i = 0; i < 15; i++) {
      drops.push({
        id: i,
        left: `${Math.random() * 80 + 10}%`,
        delay: Math.random() * 0.5,
        size: Math.random() * 30 + 10,
        duration: Math.random() * 2 + 2
      });
    }
    setBloodDrops(drops);

    // Show text after blood animation
    const timer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    // Hide cover after animation completes
    const coverTimer = setTimeout(() => {
      setShowCover(false);
    }, 4000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(coverTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {showCover && (
        <motion.div 
          className="blood-loading-container"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="blood-title-container">
            <motion.div 
              className="blood-title"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              STUDY NOTE
            </motion.div>
            
            {/* Blood drops */}
            {bloodDrops.map((drop) => (
              <motion.div
                key={drop.id}
                className="blood-drop"
                style={{ 
                  left: drop.left,
                  width: `${drop.size}px`,
                  height: `${drop.size * 1.5}px`
                }}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 300, opacity: [0, 1, 1, 0.9, 0.8] }}
                transition={{ 
                  delay: drop.delay, 
                  duration: drop.duration,
                  ease: "easeIn"
                }}
              />
            ))}
            
            {/* Loading text */}
            <AnimatePresence>
              {showText && (
                <motion.div 
                  className="blood-loading-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="blood-text">Preparing your tasks...</div>
                  <div className="blood-loading-bar">
                    <motion.div 
                      className="blood-loading-progress"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default BloodLoadingAnimation;
