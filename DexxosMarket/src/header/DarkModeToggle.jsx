import React from 'react';
import { DarkThemeToggle, useThemeMode } from 'flowbite-react';

const DarkModeToggle = () => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <div className="p-2">
      <DarkThemeToggle
        checked={mode === 'dark'}
        onChange={toggleMode}
      />
    </div>
  );
};

export default DarkModeToggle;