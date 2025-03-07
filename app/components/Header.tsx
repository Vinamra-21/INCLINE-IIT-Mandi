import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useDarkMode from "./useDarkMode";

type HeaderProps = {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ isLoginOpen, setIsLoginOpen }) => {
  const [theme, toggleTheme] = useDarkMode() as [string, () => void];
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed w-full top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/INCLINE.png"
              alt="INCLINE Logo"
              className="h-10 w-10 mr-3"
            />
            <span className="text-xl font-bold">INCLINE</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/ecoPulse">EcoPulse</NavLink>
            <NavLink href="/#features">Features</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
            {isLoginOpen && <NavLink href="/jalShakti">Jal Shakti</NavLink>}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all ${
                theme === "dark"
                  ? "bg-gray-700 hover:bg-gray-600"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label="Toggle dark mode">
              {theme === "dark" ? (
                <Sun size={20} className="text-yellow-300" />
              ) : (
                <Moon size={20} className="text-gray-700" />
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
              {isLoginOpen && <NavLink href="/jalShakti">Jal Shakti</NavLink>}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                aria-label="Toggle dark mode">
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
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
