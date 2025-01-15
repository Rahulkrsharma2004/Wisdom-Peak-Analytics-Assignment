import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800 dark:text-white">
        <Router>
          <header className="p-4 bg-white dark:bg-gray-900 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold">Wisdom Peak Analytics</h1>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 text-white rounded dark:bg-yellow-400"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </header>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </Router>
      </div>
  );
};

export default App;
