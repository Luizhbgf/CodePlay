import React, { createContext } from 'react';

export const ThemeContext = createContext({
  theme: {
    primary: '#00A5F7',
    secondary: '#4CD964',
    accent: '#FFCC00',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#333333',
    border: '#E0E0E0',
    notification: '#FF3B30',
    error: '#FF3B30',
    success: '#4CD964',
    warning: '#FF9500',
    info: '#00A5F7',
    disabled: '#CCCCCC',
    placeholder: '#999999',
    isDark: false
  },
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider 
      value={{ 
        theme: {
          primary: '#00A5F7',
          secondary: '#4CD964',
          accent: '#FFCC00',
          background: '#FFFFFF',
          card: '#FFFFFF',
          text: '#333333',
          border: '#E0E0E0',
          notification: '#FF3B30',
          error: '#FF3B30',
          success: '#4CD964',
          warning: '#FF9500',
          info: '#00A5F7',
          disabled: '#CCCCCC',
          placeholder: '#999999',
          isDark: false
        }, 
        isDarkMode: false, 
        toggleTheme: () => {} 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};