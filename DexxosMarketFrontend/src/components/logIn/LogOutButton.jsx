import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { IoIosLogOut } from "react-icons/io";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button
      type="button"
      onClick={() => logout({ returnTo: window.location.origin })}
      className="w-full text-gray-800 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 font-medium rounded-lg text-sm px-8 py-3 text-center inline-flex items-center justify-center"
    >
      <IoIosLogOut className="w-4 h-4 me-2" />
      Log Out
    </button>
  );
};

export default LogoutButton;
