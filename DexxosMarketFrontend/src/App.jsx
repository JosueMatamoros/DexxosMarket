import React from 'react';
import { useThemeMode } from 'flowbite-react';
import Ruting from "./routes";

function App() {
  const { mode } = useThemeMode();
  
  const isDarkMode = mode === 'dark';

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <Ruting />
    </div>
  );
}

export default App;