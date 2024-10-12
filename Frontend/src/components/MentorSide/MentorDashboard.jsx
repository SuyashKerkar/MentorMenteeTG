// src/pages/Dashboard.js
import React from "react";
import Navbar from "./Navbar"; // Import the Navbar component

const Dashboard = () => {
  return (
    <div className="font-sans">
      <Navbar />
      {/* Search Bar */}
      <div className="p-4 flex justify-end">
        <input
          type="text"
          placeholder="Search..."
          className="border  border-gray-400 rounded-lg p-2 w-64"
        />
      </div>

      {/* Main Content */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to Dashboard</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-gray-200 p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Upcoming Events</h2>
            <ul>
              <li>Event 1 - Date</li>
              <li>Event 2 - Date</li>
              <li>Event 3 - Date</li>
            </ul>
          </div>
          <div className="bg-gray-200 p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
            <ul>
              <li>Activity 1 - Details</li>
              <li>Activity 2 - Details</li>
              <li>Activity 3 - Details</li>
            </ul>
          </div>
          <div className="bg-gray-200 p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              Drive Updatesd Activities
            </h2>
            <ul>
              <li>Activity 1 - Details</li>
              <li>Activity 2 - Details</li>
              <li>Activity 3 - Details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
