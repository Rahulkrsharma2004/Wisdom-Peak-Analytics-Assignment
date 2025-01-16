import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDetailPage from './pages/UserDetailPage';
import { FiSun, FiMoon } from 'react-icons/fi';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  return (
    <div className="min-h-screen dark:bg-gray-800 dark:text-white">
      <Router>
        <header className="p-4 bg-gradient-to-r from-[#b7f085] to-[#ff8e8e] shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">Wisdom Peak Analytics</h1>
          <div
            className="relative w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center cursor-pointer"
            onClick={toggleDarkMode}
          >
            <div
              className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                darkMode ? 'translate-x-8' : ''
              }`}
            ></div>
            <FiSun
              className={`absolute left-1 text-yellow-500 ${
                darkMode ? 'opacity-0' : 'opacity-100'
              } transition-opacity duration-300`}
            />
            <FiMoon
              className={`absolute right-1 text-blue-500 ${
                darkMode ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}
            />
          </div>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/:id" element={<UserDetailPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
