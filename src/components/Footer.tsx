const Footer = () => {
  return (
    <footer className="bg-[#A3841D] text-white py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h3 className="text-lg font-bold">SSICSM</h3>
          <p className="text-sm">
            Canada’s Premier Model UN Crisis Simulation. ©{" "}
            {new Date().getFullYear()} SSICSM. All rights reserved.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
