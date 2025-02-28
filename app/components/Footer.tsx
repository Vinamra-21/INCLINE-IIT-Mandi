import {
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Eye,
  EyeOff,
  Lock,
  ArrowRight,
  X,
} from "lucide-react";
import { useState } from "react";
const Footer = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <footer
      id="contact"
      className="bg-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-300 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Logos Section */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          <img
            src="/iit_mandi.png"
            alt="IIT Mandi Logo"
            className="h-16 object-contain"
          />
          <img
            src="/himpact.png"
            alt="HimPACT Logo"
            className="h-16 object-contain"
          />
        </div>

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
              <SocialLink href="#" Icon={Facebook} label="Facebook" />
              <SocialLink href="#" Icon={Twitter} label="Twitter" />
              <SocialLink href="#" Icon={Linkedin} label="LinkedIn" />
              <SocialLink href="#" Icon={Instagram} label="Instagram" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/services" text="Our Services" />
              <FooterLink href="/research" text="Research" />
              <FooterLink href="/contact" text="Contact" />
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Contact Us
            </h4>
            <address className="not-italic">
              <div className="flex items-start space-x-3 mb-2">
                <MapPin className="w-5 h-5 text-green-500 dark:text-green-400 mt-1 flex-shrink-0" />
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
                  contact@indianclimate.org
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
        <div className="pt-8 border-t border-gray-300 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Indian Climate Explorer. All
              rights reserved.
            </p>
            <div className="flex space-x-6">
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
              <button
                onClick={() => setIsLoginOpen(true)}
                className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors font-medium">
                Log in
              </button>
            </div>
          </div>
        </div>
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
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
function LoginModal({ isOpen, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle successful login here
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all ">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6 pb-0">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none">
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div>
                <a
                  href="#"
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:text-green-500">
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md 
                           shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Sign up link */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <a
              href="#"
              className="font-medium text-green-600 dark:text-green-400 hover:text-green-500">
              Sign up
            </a>
          </p>
        </div>

        {/* Social login */}
        <div className="px-6 py-4 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md 
                         shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Google
            </button>
            <button
              type="button"
              className="py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md 
                         shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
