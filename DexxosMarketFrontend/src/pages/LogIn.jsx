import React, { useContext } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from '../components/logIn/LoginButton';
import LogoutButton from '../components/logIn/LogOutButton';
import LogInImage from '../../assets/LogIn.webp'

export default function LogIn() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl mx-auto h-screen">
        <div className="bg-primary hidden md:block">
          <img
            src={LogInImage}
            alt="Login Image"
            width={800}
            height={800}
            className="object-cover w-full h-full rounded-lg"
            style={{ aspectRatio: "800/800", objectFit: "cover" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center p-8 md:p-12 bg-background">
          <div className="space-y-4 w-full max-w-md">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-muted-foreground">Sign in to your account to continue.</p>
            </div>
            <div className="grid gap-4">
              <LoginButton />
            </div>
            {/* Mostrar los datos del usuario autenticado */}
            {isLoading && <div>Loading...</div>}
            {isAuthenticated && (
              <div className="mt-4 text-center">
                <h2 className="text-xl font-bold">User Info</h2>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="rounded-full w-20 h-20 mx-auto"
                />
                <p className="mt-2">Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}
