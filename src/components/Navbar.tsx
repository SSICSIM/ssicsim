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
      subItems: [
        { label: "Our Mission", path: "/about/mission" },
        { label: "Our Team", path: "/about/team" },
      ],
    },
    {
      label: "Committees",
      path: "/committees",
    },
    {
      label: "Staff",
      path: "/staff",
      subItems: [{ label: "Openings", path: "/staff/openings" }],
    },
    { label: "Register", path: "/register" },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white text-[#A3841D] shadow-lg border-b border-[#A3841D] py-2"
          : "text-white shadow-md border-b border-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full px-4">
        {/* Logo / Brand */}
        <div
          className={`text-xl font-bold tracking-tight transition-all duration-300 ${
            isScrolled ? "text-[#A3841D]" : "text-white"
          } flex items-center`}
        >
          SSICSM 2025
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className={`sm:hidden focus:outline-none ${
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

        {/* Nav Links */}
        <ul
          className={`hidden sm:flex gap-10 text-xl font-dm-sans font-light items-center`}
        >
          {navItems.map((item) => (
            <li
              key={item.path}
              className="relative group flex items-center"
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
                <ul className="absolute left-0 top-10 mt-2 bg-white shadow-lg rounded-lg py-2 w-48 z-50">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.path}>
                      <Link
                        to={subItem.path}
                        className="block px-4 py-2 text-[#A3841D] hover:bg-[#A3841D] hover:text-white transition-colors"
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg py-4 z-50 sm:hidden">
            {navItems.map((item) => (
              <li key={item.path} className="px-4 py-2 border-b border-gray-200">
                {item.subItems ? (
                  <span className="text-[#A3841D]">{item.label}</span>
                ) : (
                  <Link
                    to={item.path}
                    className="text-[#A3841D] hover:bg-[#A3841D] hover:text-white block px-4 py-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}