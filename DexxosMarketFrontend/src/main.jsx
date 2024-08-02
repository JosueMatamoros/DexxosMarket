// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import ThemeProvider from './context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Flowbite>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Flowbite>
    </BrowserRouter>
  </React.StrictMode>
);