import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return false; // Default to serene light peace theme
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-[#0c0a09] text-stone-200 transition-colors duration-500 font-outfit antialiased selection:bg-orange-500 selection:text-white';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-[#fcfaf7] text-stone-800 transition-colors duration-500 font-outfit antialiased selection:bg-orange-500 selection:text-white';
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
