import React, {useState} from 'react';
import { Navbar, DarkThemeToggle, Dropdown } from 'flowbite-react';
import { useThemeMode } from 'flowbite-react';
import { LuUser2 } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";  // Importa el hook de Auth0
import { BsCart2 } from "react-icons/bs";
import ShoppingCart from '../components/products/ShoppingCart';

const Header = () => {
  const { mode, toggleMode } = useThemeMode();
  const { isAuthenticated, user, logout } = useAuth0();  // Obtén el estado de autenticación, usuario y logout
  const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        console.log("Drawer toggle triggered");
        setIsOpen(!isOpen);
    };


  // Determina si el modo oscuro está activado
  const isDarkMode = mode === 'dark';

  return (
    <>
        <Navbar
            fluid={true}
            rounded={true}
            className={`transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
        >
            <Navbar.Brand href="#">
                <CodeIcon className={`w-8 h-8 ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </Navbar.Brand>
            <div className="flex md:order-2 items-center space-x-2">
                {isAuthenticated && (
                    <BsCart2 className="w-6 h-6 cursor-pointer text-current" onClick={toggleDrawer} />
                )}
                <Dropdown
                    label={
                        isAuthenticated ? (
                            <img
                                src={user.picture}
                                alt={user.name}
                                className="w-8 h-8 rounded-full cursor-pointer"
                            />
                        ) : (
                            <LuUser2 className="w-6 h-6 cursor-pointer" />
                        )
                    }
                    inline={true}
                >
                    {isAuthenticated ? (
                        <>
                            <Dropdown.Item as={Link} to="/account">
                                Account
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => logout({ returnTo: window.location.origin })}>
                                Log Out
                            </Dropdown.Item>
                        </>
                    ) : (
                        <Dropdown.Item as={Link} to="/login">
                            Log In
                        </Dropdown.Item>
                    )}
                </Dropdown>
                <DarkThemeToggle checked={isDarkMode} onChange={toggleMode} />
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link as={Link} to="/" active={true}>
                    Home
                </Navbar.Link>
                <Navbar.Link as={Link} to="/shop">
                    Shop
                </Navbar.Link>
                <Navbar.Link as={Link} to="/locations">
                    Puntos de Venta
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
        <ShoppingCart isOpen={isOpen} toggleDrawer={toggleDrawer} />
    </>
);
};

function CodeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default Header;
