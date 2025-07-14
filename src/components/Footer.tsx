import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa"; // Import icons from React Icons

const Footer = () => {
  return (
    <footer className="bg-[#A3841D] text-white py-4 font-dm-sans">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-6 md:mb-0 flex flex-col items-center md:items-start h-auto">
          {/* SSICSM Logo */}
          <img
            src="/assets/photos/branding/WhiteLogo.png" // Replace with the correct path to your logo
            alt="SSICSM Logo"
            className="w-[200px] h-auto ml-[-5px]"
          />
          <p className="text-sm">
            Canada’s Premier Model UN Crisis Simulation. ©{" "}
            {new Date().getFullYear()} SSICSIM. All rights reserved.
          </p>
        </div>

        {/* Middle Section: Subtabs */}
        <div className="flex flex-col gap-2 text-center md:text-left mb-4 h-auto">
          <h4 className="text-lg font-bold mb-1">Quick Links</h4>
          <a
            href="/about"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            About Us
          </a>
          <a
            href="/committees"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Committees
          </a>
          <a
            href="/register"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Register
          </a>
          <a
            href="/contact"
            className="text-sm hover:text-gray-300 transition-colors"
          >
            Contact Us
          </a>
        </div>

        {/* Right Section: Social Media and Contact */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/SSICsim/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/ssicsim/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/company/ssicsim/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              <FaTwitter className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm">
            Contact us at:{" "}
            <a
              href="mailto:contact@ssicsim.ca"
              className="underline hover:text-gray-300"
            >
              contact@ssicsim.ca
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
