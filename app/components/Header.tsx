import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import useDarkMode from "./useDarkMode"; // Assuming useDarkMode is in the same directory

const Header = () => {
  const [theme, toggleTheme] = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`bg-green-700 ${
        theme === "dark" ? "dark:bg-green-900" : ""
      } text-white`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold">
          Indian Climate Explorer
        </a>
        <nav className="hidden md:flex space-x-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-green-600 transition-colors duration-200">
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </nav>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-green-600 dark:bg-green-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="#features" onClick={() => setIsOpen(false)}>
              Features
            </NavLink>
            <NavLink href="#about" onClick={() => setIsOpen(false)}>
              About
            </NavLink>
            <NavLink href="#contact" onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-green-500 transition-colors duration-200">
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </motion.nav>
      )}
    </header>
  );
};

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <a
    href={href}
    className="hover:text-green-200 transition-colors duration-200"
    onClick={onClick}>
    {children}
  </a>
);

export default Header;
