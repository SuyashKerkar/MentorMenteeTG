// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 p-4 pr-16 pl-16">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white font-bold text-xl">HOD Dashboard</div>
      <ul className="flex space-x-6">
        <li>
          <Link to="/" className="text-white hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/studentlisthod" className="text-white hover:text-gray-400">
            Students Details
          </Link>
        </li>
        <li>
          <Link to="/news" className="text-white hover:text-gray-400">
            News
          </Link>
        </li>

        <li>
          <Link
            to="/"
            onClick={() => {
              localStorage.removeItem("token");
              location.reload();
            }}
            className="text-white hover:text-gray-400"
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
