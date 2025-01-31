import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoLogOut, IoReceiptSharp } from "react-icons/io5";
import { MdDashboard, MdPeopleAlt, MdStorefront } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom"; // Assuming React Router is used
import { Logout } from "../../components/component";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col h-screen dark:bg-gray-900 dark:text-white bg-gray-200 text-black ${
        isOpen ? "w-64" : "w-20"
      } transition-all duration-300`}
    >
      {/* Top Section */}
      <div
        className={`flex items-center  px-4 py-4 border-b border-gray-700" ${
          isOpen ? "justify-between" : "justify-center"
        }
        `}
      >
        <div className="flex items-center">
          {isOpen && (
            <span className="ml-4 text-2xl font-extrabold">
              <Link to={"/"}>SHOP.CO</Link>
            </span>
          )}
        </div>
        <button onClick={toggleSidebar} className="text-xl focus:outline-none">
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-4">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `flex items-center  px-4 py-3 mb-2 rounded-lg transition`
          }
        >
          <span className="material-icons">
            <MdDashboard />
          </span>
          {isOpen && <span className="ml-4">Dashboard</span>}
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-2 rounded-lg transition ${
              isActive
                ? "bg-gray-400"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <span className="material-icons">
            <MdStorefront />
          </span>
          {isOpen && <span className="ml-4">Products</span>}
        </NavLink>
        <NavLink
          to="category"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-2 rounded-lg transition ${
              isActive
                ? "bg-gray-400"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <span className="material-icons">
            <TbCategoryFilled />
          </span>
          {isOpen && <span className="ml-4">Categories</span>}
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-2 rounded-lg transition ${
              isActive
                ? "bg-gray-400"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`
          }
        >
          <span className="material-icons">
            <IoReceiptSharp />
          </span>
          {isOpen && <span className="ml-4">Orders</span>}
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-2  text-black rounded-lg transition ${
              isActive
                ? "bg-gray-700  text-white "
                : "text-gray-400 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <span className="material-icons">
            <MdPeopleAlt />
          </span>
          {isOpen && <span className="ml-4">Users</span>}
        </NavLink>
        {/* <NavLink
          to="/stocks"
          className={({ isActive }) =>
            `flex items-center px-4 py-3 mb-2 rounded-lg transition ${
              isActive
                ? "bg-gray-400"
                : "text-gray-400 hover:bg-gray-500 hover:text-white"
            }`
          }
        >
          <span className="material-icons">
            <FaHouseCircleCheck />
          </span>
          {isOpen && <span className="ml-4">In Stock</span>}
        </NavLink> */}
      </div>

      {/* Logout Section */}
      <div className="px-4 py-4 border-t border-gray-700">
        <Logout style={"w-full gap-0 btn-error"}>
          <span className="material-icons">
            <IoLogOut />
          </span>
          {isOpen && <span className="ml-4">Logout</span>}
        </Logout>
      </div>
    </div>
  );
};

export default Sidebar;
