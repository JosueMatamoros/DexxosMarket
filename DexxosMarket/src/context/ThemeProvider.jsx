import React, { useEffect } from 'react';
import { useThemeMode } from 'flowbite-react';

const ThemeProvider = ({ children }) => {
  const { mode } = useThemeMode();

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  return <>{children}</>;
};

export default ThemeProvider;