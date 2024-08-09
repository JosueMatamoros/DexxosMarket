// AuthProvider.js
import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider, GithubAuthProvider, signOut } from 'firebase/auth';
import app from '../../firebaseConfig';

const AuthContext = createContext(); // Creación del contexto

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(app), (user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
          await signInWithRedirect(getAuth(app), provider);
      } catch (error) {
          if (error.code === 'auth/cancelled-popup-request') {
              console.log('Popup request was cancelled due to multiple attempts.');
          } else {
              console.error(error);
          }
      }
  };

  const signInWithGitHub = async () => {
      const provider = new GithubAuthProvider();
      try {
          await signInWithRedirect(getAuth(app), provider);
      } catch (error) {
          if (error.code === 'auth/cancelled-popup-request') {
              console.log('Popup request was cancelled due to multiple attempts.');
          } else {
              console.error(error);
          }
      }
  };

    const logOut = () => {
        return signOut(getAuth(app));
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInWithGitHub, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export { AuthContext }; // Asegúrate de exportar AuthContext
