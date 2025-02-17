import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Logout } from "../../components/component";
import { IoLogOut } from "react-icons/io5";
import { FaSun, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageLetter } from "../../utils/utils";
import { useTheme } from "../../services/providers/ThemeProvider";
import Banner from "./Banner";

const AdminDashboardHeader = () => {
  const [_, toggleTheme] = useTheme();
  const { userDetails } = useSelector((store) => store.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleTheme = () => {
    toggleTheme();
  };
  return (
    <>
      <Banner />
      <header className="flex items-center justify-between bg-white dark:bg-slate-900  shadow-md p-2 sm:px-6 sm:py-4 sticky top-0 z-10">
        {/* Left Section - Search Bar */}
        {/* <div className="flex items-center w-fit  sm:px-5">
        <input
          type="text"
          placeholder="Search..."
          className={cl(
            "md:w-96 w-auto sm:px-4 py-2 border bg-transparent rounded-lg transition-all focus:ring-2 focus:ring-slate-500"
          )}
        />
      </div> */}

        {/* Right Section - Notifications and Profile */}
        <div className="flex w-full gap-2 px-2 justify-end  items-center">
          {/* theme change  */}
          <div className="flex">
            <span className="cursor-pointer" onClick={handleTheme}>
              <FaSun size={25} />
            </span>
          </div>
          {/* Notifications */}
          {/* <div className="relative">
          <FiBell className="text-2xl text-gray-600 cursor-pointer" />
          <span className="absolute top-0 right-0 inline-flex items-center justify-center h-4 w-4 bg-red-500 text-white text-xs rounded-full">
            3
          </span>
        </div> */}

          {/* Profile */}
          <div className="relative">
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              {userDetails?.imageUrl ? (
                <img
                  src={userDetails?.imageUrl}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <ImageLetter name={userDetails?.username} style={"!w-12"} />
              )}

              <span className="text-gray-700 font-medium capitalize">
                {userDetails?.username}
              </span>
              <MdOutlineKeyboardArrowDown className="text-xl text-gray-600" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute bg-white right-0 mt-2 p-2 w-48  border rounded-lg shadow-lg z-50">
                <button className="w-full  px-4 py-2 rounded-lg hover:bg-gray-100">
                  <Link to={"/user"} className="flex gap-1 items-center">
                    <span>
                      <FaUserCircle />
                    </span>
                    Profile
                  </Link>
                </button>
                {/* <button className="w-full text-left flex gap-1 items-center px-4 py-2 rounded-lg hover:bg-gray-100">
                <span>
                  <SiPrivateinternetaccess />
                </span>
                Roles
              </button> */}
                <Logout style={"w-full mt-2 text-white"}>
                  <span>
                    <IoLogOut color="white" />
                  </span>
                  Logout
                </Logout>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminDashboardHeader;
