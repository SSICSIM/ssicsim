import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null); // Track which dropdown is open
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu state

  const navItems = [
    { label: "Home", path: "/" },
    {
      label: "About",
      path: "/about",
      subItems: [{ label: "Our Mission", path: "/about/mission" }],
    },
    {
      label: "Conference",
      path: "/conference",
      subItems: [{ label: "Resources", path: "/resources" }],
    },
    {
      label: "Staff",
      path: "/staff",
      subItems: [{ label: "Open Roles", path: "/apply" }],
    },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Change navbar style when scrolling past 100px
      setIsScrolled(scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r mb-5 from-[#A3841D] via-[#B89520] to-[#A3841D] text-white py-3 px-4 text-center shadow-md">
        <Link
          to="/apply"
          className="hover:underline transition-all duration-200 inline-block"
        >
          <span className="font-dm-sans text-sm md:text-base">
            🎉 <strong>Director </strong> applications are officially open!
            <span className="hidden lg:inline">
              {" "}
              Closes on <strong>Wednesday, March 18, 2026 at 11:59 PM</strong>.
            </span>
            <span className="ml-2 underline font-semibold">
              Click here to apply!
            </span>
          </span>
        </Link>
      </div>

      <nav
        className={`mt-2 md:mt-3 lg:mt-2 fixed top-[52px] left-2 right-2 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 backdrop-blur-md shadow-lg border border-[#A3841D] py-2 rounded-lg px-4"
            : " shadow-md border-b border-white py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
          {/* Logo / Brand */}
          {/* Logo / Brand */}
          <div className="flex items-center">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              {" "}
              {/* Navigate to home */}
              <img
                src={
                  isScrolled
                    ? "/assets/photos/branding/GoldLogo.png"
                    : "/assets/photos/branding/WhiteLogo.png"
                }
                alt="SSICSM Logo"
                className={`h-10 transition-all duration-300 ml-5 ${
                  isScrolled ? "filter-none" : "filter brightness-0 invert"
                }`}
              />
            </Link>
          </div>{" "}
          {/* Hamburger Menu for Mobile */}
          <button
            className={`md:hidden focus:outline-none ${
              isScrolled ? "text-[#A3841D]" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Mobile Menu */}
          {/* Mobile Menu */}
          <ul
            className={`absolute top-full left-0 w-full bg-gray-200 border-b-2 border-b-gray-500 shadow-lg rounded-lg py-4 z-40 transition-all duration-300 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none"
            }`}
          >
            {navItems.map((item) => (
              <li
                key={item.path}
                className="px-4 py-2 border-b font-dm-sans border-gray-200"
              >
                {item.subItems ? (
                  <>
                    {/* Dropdown Toggle */}
                    <button
                      className="block text-black hover:bg-[#A3841D] hover:text-white rounded-lg transition-colors w-full text-left"
                      onClick={() =>
                        setDropdownOpen(
                          dropdownOpen === item.label ? null : item.label,
                        )
                      }
                    >
                      {item.label}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-4 w-4 inline"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {dropdownOpen === item.label && (
                      <ul className="pl-4 mt-2">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.path} className="py-2">
                            <Link
                              to={subItem.path}
                              className="block text-black hover:bg-[#A3841D] hover:text-white rounded-lg transition-colors"
                              onClick={() => {
                                setIsMenuOpen(false); // Close menu after navigation
                                setDropdownOpen(null); // Close dropdown
                              }}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className="block text-black hover:bg-[#A3841D] hover:text-white rounded-lg transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false); // Close menu after navigation
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* Nav Links */}
          <ul
            className={`hidden md:flex lg:gap-10 md:text-md md:gap-4 lg:text-lg  font-dm-sans font-light items-center mr-6`}
          >
            {navItems.map((item) => (
              <li
                key={item.path}
                className={`relative group flex items-center ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                onMouseEnter={() => setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                {/* Conditionally render Link or span */}
                {item.subItems ? (
                  <span
                    className={`hover:text-[#A3841D] transition-colors cursor-default py-3 ${
                      dropdownOpen === item.label ? "text-[#A3841D]" : ""
                    } flex items-center`}
                  >
                    {item.label}
                    {/* Add downwards arrow for dropdown items */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className={`hover:text-[#A3841D] transition-colors ${
                      location.pathname === item.path
                        ? isScrolled
                          ? "bg-[#A3841D] text-white p-3 px-6 rounded-full"
                          : "bg-white text-[#A3841D] p-3 px-6 rounded-4xl"
                        : ""
                    } flex items-center`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.subItems && dropdownOpen === item.label && (
                  <ul
                    className={`absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 z-50 ${
                      isScrolled
                        ? "border border-[#A3841D]"
                        : "border border-white"
                    }`}
                  >
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <Link
                          to={subItem.path}
                          className="block px-4 py-2 text-black hover:bg-[#A3841D] hover:text-white rounded-lg transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
