// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Flowbite } from 'flowbite-react';
import ThemeProvider from './context/ThemeProvider';
import { CartProvider } from './context/CartContext';
import { Auth0Provider } from '@auth0/auth0-react';
import auth0Config from '../Auth0';

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Flowbite>
        <CartProvider>
          <ThemeProvider>
            <Auth0Provider
              domain={auth0Config.domain}
              clientId={auth0Config.clientId}
              authorizationParams={{
                redirect_uri: auth0Config.redirectUri,
                audience: auth0Config.audience,
                response_type: 'token id_token',
              }}
            >
              <App />
            </Auth0Provider>
          </ThemeProvider>
        </CartProvider>
      </Flowbite>
    </BrowserRouter>
);