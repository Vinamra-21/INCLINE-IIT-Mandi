const Footer = () => {
  return (
    <footer className="bg-green-800 dark:bg-green-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">
              Indian Climate Explorer
            </h3>
            <p className="text-sm text-green-200 dark:text-green-300">
              Empowering communities with climate information and adaptive
              strategies.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="text-sm">
              <li className="mb-2">
                <a
                  href="#"
                  className="hover:text-green-200 transition-colors duration-200">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#features"
                  className="hover:text-green-200 transition-colors duration-200">
                  Features
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#about"
                  className="hover:text-green-200 transition-colors duration-200">
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#contact"
                  className="hover:text-green-200 transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-white hover:text-green-200 transition-colors duration-200">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-green-200 dark:text-green-300">
          <p>
            &copy; {new Date().getFullYear()} Indian Climate Explorer. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
