// AuthProvider.js
import React, { createContext, useEffect, useState } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import auth0Config from '../../Auth0';

const AuthContext = createContext(); // Creación del contexto

export const AuthProvider = ({ children }) => {
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

    // Lógica adicional o métodos personalizados pueden añadirse aquí
    const login = async () => {
        await loginWithRedirect();
    };

    const logoutUser = () => {
        logout({ returnTo: window.location.origin });
    };

    const contextValue = {
        login,
        logoutUser,
        user,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
      };

    return (
        <Auth0Provider domain={auth0Config.domain} clientId={auth0Config.clientId} clienSecret={auth0Config.clientSecret} audience={auth0Config.audience} redirectUri={auth0Config.redirectUri} scope={auth0Config.scope} authorizationParams={window.location.origin} >
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </Auth0Provider>
    );
}
