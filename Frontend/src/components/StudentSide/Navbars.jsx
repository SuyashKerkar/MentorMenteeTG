import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbars = () => {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [resultDropdown, setResultDropdown] = useState(false);
  const [achievementsDropdown, setAchievementsDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest(".dropdown-button")) {
        setProfileDropdown(false);
        setResultDropdown(false);
        setAchievementsDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  const handleDropdownClick = (e, dropdownSetter) => {
    e.stopPropagation();
    dropdownSetter((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <nav className="bg-gray-800 shadow-md z-50 relative">
      <div className="container mx-auto p-4 flex items-center justify-between">
        {/* Logo and Header */}
        <div className="flex items-center">
          <img src="/src/assets/logo.png" alt="logo" className="h-12 w-12" />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="block lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>

        {/* Navigation Bar */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:justify-end lg:space-x-7 lg:w-auto`}
        >
          <Link
            to="/Sdashboard"
            className="block text-sm font-semibold text-white hover:text-gray-400 lg:inline-block"
          >
            Home
          </Link>
          <Link
            to="/StudentD"
            className="block text-sm font-semibold text-white hover:text-gray-400 lg:inline-block"
          >
            Personal Details
          </Link>

          {/* Result Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => handleDropdownClick(e, setResultDropdown)}
              className="dropdown-button block text-sm font-semibold text-white hover:text-gray-400 lg:inline-block"
            >
              Result
            </button>
            {resultDropdown && (
              <div className="absolute bg-white shadow-lg rounded-md z-10">
                <Link
                  to="/PYDetails"
                  className="block px-4 py-2 text-sm text-gray-800 hover:opacity-70"
                >
                  Previous Details
                </Link>
                <Link
                  to="/CurrentD"
                  className="block px-4 py-2 text-sm text-gray-800 hover:opacity-70"
                >
                  Current Details
                </Link>
              </div>
            )}
          </div>

          {/* Internships Link */}
          <Link
            to="/Internships"
            className="block text-sm font-semibold text-white hover:text-gray-400 lg:inline-block"
          >
            Internships
          </Link>

          {/* Achievements Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => handleDropdownClick(e, setAchievementsDropdown)}
              className="dropdown-button block text-sm font-semibold text-white hover:text-gray-400 lg:inline-block"
            >
              Achievements
            </button>
            {achievementsDropdown && (
              <div className="absolute bg-white py-2 shadow-lg rounded-md z-10">
                <Link
                  to="/Cocurriact"
                  className="block px-0 py-2 text-sm text-gray-800 hover:opacity-70"
                >
                  Cocurricular Activities
                </Link>
                <Link
                  to="/Extracurriact"
                  className="block px-0 py-2 text-sm text-gray-800 hover:opacity-70"
                >
                  Extracurricular Activities
                </Link>
              </div>
            )}
          </div>

          {/* Career Pathways Link */}
          <Link
            to="/CareerPath"
            className="block text-sm font-semibold text-white hover:text-gray-400 lg:inline-block"
          >
            Career Pathways
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={(e) => handleDropdownClick(e, setProfileDropdown)}
              className="dropdown-button text-lg bg-white text-gray-800 font-semibold px-4 py-2 rounded-md hover:opacity-50 hover:bg-gray-400"
            >
              Profile
            </button>
            {profileDropdown && (
              <div className="absolute bg-white py-2 shadow-lg rounded-md z-10">
                <Link
                  to="/StudentD"
                  className="block px-4 py-2 text-sm text-gray-800 hover:opacity-50"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/"
                  onClick={logout}
                  className="block px-4 py-2 text-sm text-gray-800 hover:opacity-70"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add margin below the navbar to prevent content overlap */}
      <div className="mb-10"></div>
    </nav>
  );
};

export default Navbars;
