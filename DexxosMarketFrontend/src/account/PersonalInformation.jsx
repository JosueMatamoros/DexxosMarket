import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useThemeMode } from 'flowbite-react';

export default function PersonalInformation() {
    const { mode, toggleMode } = useThemeMode();
    const { user, isAuthenticated, isLoading } = useAuth0();

    const isDarkMode = mode === 'dark';

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view your personal information.</div>;
    }

    return (
        
        <div className={`flex items-center space-x-4 p-4 transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
            <img
                src={user.picture}
                alt={user.name}
                className="w-16 h-16 rounded-full"
            />
            <div>
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
            </div>
        </div>
    );
}
