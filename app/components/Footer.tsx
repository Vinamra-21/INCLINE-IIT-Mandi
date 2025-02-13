import {
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gradient-to-r dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-300 py-12 transition-colors duration-300">
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
