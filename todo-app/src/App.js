import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import LoadingAnimation from './components/LoadingAnimation';
import Login from './components/Login';
import VideoBackground from './components/VideoBackground';
import ThreeScene from './components/ThreeScene';
import ModelContainer from './components/ModelContainer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('studyNoteUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.isLoggedIn) {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Increased loading time for better effect

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (username) => {
    setUser({ username, isLoggedIn: true });
  };

  const handleLogout = () => {
    // Remove user from localStorage
    localStorage.removeItem('studyNoteUser');
    setUser(null);
  };

  // Render content based on loading and login state
  const renderContent = () => {
    if (loading) {
      return <LoadingAnimation />;
    }

    if (!user) {
      return <Login onLogin={handleLogin} />;
    }

    return <TodoList username={user.username} onLogout={handleLogout} />;
  };

  return (
    <>
      <VideoBackground />
      <ThreeScene />
      <div className="App">
        <h1>STUDY NOTE</h1>
        {renderContent()}
        <ModelContainer />
      </div>
    </>
  );
}

export default App;
