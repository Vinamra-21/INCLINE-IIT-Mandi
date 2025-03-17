import {
  Mail,
  MapPin,
  Link,
  Twitter,
  Linkedin,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { handleSignIn, handleSignOut } from "./EcoPulse";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
const Footer: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <footer
      id="footer"
      className="bg-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-300 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Indian Climate Explorer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Empowering communities with climate information and adaptive
              strategies for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <SocialLink
                href="https://x.com/HIMPACTLAB_IITM"
                Icon={Twitter}
                label="Twitter"
              />
              <SocialLink
                href="https://www.linkedin.com/company/himalayan-hydroclimatology-impact-research-lab/?viewAsMember=true"
                Icon={Linkedin}
                label="LinkedIn"
              />
              <SocialLink
                href="https://sites.google.com/view/himpactlab/"
                Icon={Link}
                label="Site"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/features" text="Our Services" />
              <div className="flex">
                <a href="https://iitmandi.ac.in" target="_blank">
                  <img
                    src="/iit_mandi.png"
                    alt="IIT Mandi Logo"
                    className="h-12 object-contain p-1"
                  />
                </a>
                <a
                  href="https://sites.google.com/view/himpactlab/"
                  target="_blank">
                  <img
                    src="/himpact.png"
                    alt="HimPACT Logo"
                    className="h-12 object-contain p-1"
                  />
                </a>
              </div>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h4>
            <address className="not-italic">
              <div className="flex items-start space-x-3 mb-2">
                <a
                  href="https://www.google.com/maps?q=31.780222,76.996624"
                  target="_blank">
                  <MapPin className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
                </a>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  A11-Building, 3rd floor, SCENE, IIT MANDI (North Campus),
                  Mandi-175005, Himachal Pradesh, India
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                <a
                  href="mailto:contact@indianclimate.org"
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-200">
                  vivekgupta@iitmandi.ac.in
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0" />
                <a
                  href="mailto:contact@indianclimate.org"
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-200">
                  himpactlab@gmail.com
                </a>
              </div>
            </address>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Stay Updated
            </h4>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 text-white rounded transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-300 dark:border-gray-800 align-middle">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400 align-middle">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Indian Climate Explorer. All
              rights reserved.
            </p>
            <div className="flex space-x-6 align-middle">
              <a
                href="/privacy"
                className="hover:text-green-600 dark:hover:text-green-300 transition-colors duration-200">
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="hover:text-green-600 dark:hover:text-green-300 transition-colors duration-200">
                Terms of Use
              </a>

              {isAuthenticated ? (
                <button
                  onClick={() => handleSignOut(setIsAuthenticated)}
                  className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700">
                  Log Out
                </button>
              ) : (
                <button
                  onClick={() => handleSignIn(setIsAuthenticated)}
                  className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">
                  Log In
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, Icon, label }) => (
  <a
    href={href}
    className="bg-gray-300 dark:bg-gray-800 p-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700 transition-colors duration-200"
    aria-label={label}>
    <Icon className="w-5 h-5 text-gray-800 dark:text-gray-300" />
  </a>
);

const FooterLink = ({ href, text }) => (
  <li>
    <a
      href={href}
      className="text-sm text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-200">
      {text}
    </a>
  </li>
);

export default Footer;
