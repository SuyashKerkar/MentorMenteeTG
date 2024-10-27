import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    location.reload();
  };

  return (
    <nav className="bg-gray-800 p-5 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img
          src="/src/assets/logo.png"
          alt="College Logo"
          className="h-10 w-10 rounded"
        />
        <span className="text-white font-bold text-lg">VPPCOE&VA</span>
      </div>

      <div className="flex space-x-10 text-sm">
        <Link to="/" className="text-white hover:text-blue-100">
          Home
        </Link>
        <Link to="/notification" className="text-white hover:text-blue-100">
          Notifications
        </Link>
        <Link to="/student" className="text-white hover:text-blue-100">
          List of Students
        </Link>
        <Link to="/chat" className="text-white hover:text-blue-100">
          Chat
        </Link>
        <Link to="/download" className="text-white hover:text-blue-100">
          Download{" "}
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="text-white hover:text-blue-100"
        >
          Profile
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
            <a
              href=""
              className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Edit Profile
            </a>
            <a
              href="/"
              onClick={logout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-300"
            >
              Logout
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
