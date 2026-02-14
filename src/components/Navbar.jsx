import { Moon, Sun } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center px-8 sticky top-0 z-50 transition-colors duration-300">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        {/* <div className="bg-blue-500 p-1.5 rounded-lg text-xl text-white"></div> */}
        <span className="text-xl font-bold tracking-tight text-slate-800 dark:text-white">
          AptitudePlatform
        </span>
      </div>
      
      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-lg hover:ring-2 hover:ring-blue-400 transition-all"
          title="Toggle Dark Mode"
        >
          {theme === 'light' ? <Moon color="#3b82f6"/> : <Sun />}
        </button>

        <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-blue-500 font-medium text-sm">
          Home
        </Link>
        
      
      </div>
    </nav>
  );
};

export default Navbar;