import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
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

        {/* Nav Links */}
        <ul
          className={`hidden md:flex gap-10 text-xl font-dm-sans font-light items-center`}
        >
          {navItems.map((item) => (
            <li key={item.path} className="relative group flex items-center">
              {item.subItems ? (
                <span
                  className={`hover:text-[#A3841D] transition-colors cursor-default py-3 flex items-center`}
                >
                  {item.label}
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
            </li>
          ))}
        </ul>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <ul className="absolute top-16 left-0 w-full bg-white shadow-lg rounded-lg py-4 z-50 md:hidden">
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