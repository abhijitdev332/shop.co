import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Logout } from "../../components/component";
import { IoLogOut } from "react-icons/io5";
import { SiPrivateinternetaccess } from "react-icons/si";
import { FaUserCircle } from "react-icons/fa";
const imageUrl =
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const AdminDashboardHeader: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 sticky top-0 z-10">
      {/* Left Section - Search Bar */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-96 px-4 py-2 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      {/* Right Section - Notifications and Profile */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <div className="relative">
          <FiBell className="text-2xl text-gray-600 cursor-pointer" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 bg-red-500 text-white text-xs rounded-full">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="relative">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={imageUrl}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium">Admin</span>
            <MdOutlineKeyboardArrowDown className="text-xl text-gray-600" />
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 p-2 w-48 bg-neutral border rounded-lg shadow-lg z-50">
              <button className="w-full text-left flex gap-1 items-center px-4 py-2 rounded-lg hover:bg-gray-100">
                <span>
                  <FaUserCircle />
                </span>
                Profile
              </button>
              <button className="w-full text-left flex gap-1 items-center px-4 py-2 rounded-lg hover:bg-gray-100">
                <span>
                  <SiPrivateinternetaccess />
                </span>
                Roles
              </button>
              <Logout style={"w-full mt-2 bg-error"}>
                <span>
                  <IoLogOut />
                </span>
                Logout
              </Logout>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
