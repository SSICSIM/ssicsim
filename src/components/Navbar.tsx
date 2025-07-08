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
      className={`fixed top-2 left-2 right-2 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/30 backdrop-blur-md shadow-lg border border-[#A3841D] py-2 rounded-lg px-4"
          : " shadow-md border-b border-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* Logo / Brand */}
        <div className="flex items-center">
            <img
                src={isScrolled ? "/assets/photos/branding/GoldLogo.png" : "/assets/photos/branding/WhiteLogo.png"}
                alt="SSICSM Logo"
                className={`h-10 transition-all duration-300 ${
                isScrolled ? "filter-none" : "filter brightness-0 invert"
                }`}
            />
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
              className={`relative group flex items-center text-black ${isScrolled ? "text-black" : "text-white"}`}
              onMouseEnter={() => setDropdownOpen(item.label)}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              {/* Conditionally render Link or span */}
              {item.subItems ? (
                <span
                  className={`hover:text-[#A3841D] transition-colors cursor-default py-3 ${
                    dropdownOpen === item.label ? "text-[#A3841D]" : ""
                  } ${
                    isScrolled ? "text-black" : "text-white"
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
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
