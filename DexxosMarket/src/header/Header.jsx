import React from 'react';
import { Navbar, DarkThemeToggle } from 'flowbite-react';
import { useThemeMode } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { mode, toggleMode } = useThemeMode();

  // Determina si el modo oscuro está activado
  const isDarkMode = mode === 'dark';

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className={`transition-colors duration-500 ease-in-out ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'}`}
    >
      <Navbar.Brand href="#">
        <CodeIcon className={`w-8 h-8 ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`} />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle checked={isDarkMode} onChange={toggleMode} />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} to="/otra-vara">
          Otra Vara
        </Navbar.Link>
        <Navbar.Link as={Link} to="/otra-vara-2">
          Otra Vara 2
        </Navbar.Link>
        <Navbar.Link as={Link} to="/otra-vara-3">
          Otra Vara 3
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
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