import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosLogIn } from "react-icons/io";

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = () => {
        loginWithRedirect({
            redirectUri: 'http://localhost:5173/account',
        });
    };

    return (
        <button
            type="button"
            onClick={handleLogin}
            className="w-full text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-3 text-center inline-flex items-center justify-center"
        >
            <IoIosLogIn className="w-4 h-4 mr-2" aria-hidden="true" />
            Sign in
        </button>
    );
};
