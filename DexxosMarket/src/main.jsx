import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Flowbite } from 'flowbite-react';
import ThemeProvider from './context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Flowbite>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Flowbite>
  </React.StrictMode>
);