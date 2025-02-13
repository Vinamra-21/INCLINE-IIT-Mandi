import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "./useDarkMode";

const Header = () => {
  const [theme, toggleTheme] = useDarkMode() as [string, () => void];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="relative flex items-center space-x-3">
            <img
              src="./INCLINE.png"
              alt="INCLINE Logo"
              className="h-8 w-auto"
            />
          </a>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/ecoPulse">EcoPulse</NavLink>
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              aria-label="Toggle theme">
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
              )}
            </button>
          </nav>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Toggle menu">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-4 space-y-4">
              <NavLink href="/ecoPulse" onClick={() => setIsOpen(false)}>
                EcoPulse
              </NavLink>
              <NavLink href="/#features" onClick={() => setIsOpen(false)}>
                Features
              </NavLink>
              <NavLink href="about" onClick={() => setIsOpen(false)}>
                About
              </NavLink>
              <NavLink href="/#contact" onClick={() => setIsOpen(false)}>
                Contact
              </NavLink>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                <span className="mr-2">Toggle theme</span>
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
                )}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
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
    className="relative block text-gray-800 dark:text-gray-200 hover:text-green-800 dark:hover:text-green-300 transition-colors duration-200 text-sm font-medium group"
    onClick={onClick}>
    {children}
    <motion.div className="absolute left-0 bottom-0 h-0.5 bg-green-500 dark:bg-green-400 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
  </a>
);

export default Header;
