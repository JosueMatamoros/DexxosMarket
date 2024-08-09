import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider'; // Importa el AuthContext

export default function LogIn() {
    const authContext = useContext(AuthContext); // Usa AuthContext en lugar de AuthProvider
    const [userInfo, setUserInfo] = useState(null);
    const { signInWithGoogle, signInWithGitHub, user, logOut } = authContext;

    if (!authContext) {
        console.error('AuthContext is undefined. Make sure that AuthProvider is properly configured and wrapping your components.');
        return null; // O muestra un mensaje de error en la UI si es necesario
    }

    const handleSignInWithGoogle = async () => {
        try {
            await signInWithGoogle();
            // Después de iniciar sesión, actualiza el estado local con la información del usuario
            setUserInfo({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
            console.log('User Info:', {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
        } catch (error) {
            console.error('Error signing in with Google:', error);
        }
    };

    const handleSignInWithGitHub = async () => {
        try {
            await signInWithGitHub();
            // Después de iniciar sesión, actualiza el estado local con la información del usuario
            setUserInfo({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
            console.log('User Info:', {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
        } catch (error) {
            console.error('Error signing in with GitHub:', error);
        }
    };

    useEffect(() => {
        if (user) {
            // Actualiza la información del usuario en el estado local cuando se detecta un inicio de sesión exitoso
            setUserInfo({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
            console.log('User Info:', {
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            });
        }
    }, [user]);

    return (
        <div className='mx-auto max-w-sm space-y-3 pt-8'>
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to your account using your preferred method.</p>
            </div>
            <div className='space-y-4'>
                <button
                    type="button"
                    onClick={handleSignInWithGoogle}
                    className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-8 py-3 text-center inline-flex items-center justify-center"

                >
                    <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Sign in with Google
                </button>
                <button
                    type="button"
                    onClick={signInWithGitHub}
                    className="w-full text-white bg-black hover:bg-black/90 focus:ring-4 focus:outline-none focus:ring-black/50 font-medium rounded-lg text-sm px-8 py-3 text-center inline-flex items-center justify-center"


                >
                    <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.97 0-.88.31-1.6.82-2.16-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.16 0 3.09-1.87 3.77-3.65 3.97.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
                        />
                    </svg>
                    Sign in with GitHub
                </button>
            </div>
        </div>
    )
}
