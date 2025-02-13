import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoLogOut, IoReceiptSharp } from "react-icons/io5";
import { MdDashboard, MdPeopleAlt, MdStorefront } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom"; // Assuming React Router is used
import { Logout } from "../../components/component";
import { sidebarMenu } from "../../constant/constant";
import cl from "classnames";
const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col h-screen dark:bg-gray-900 dark:text-white bg-gray-200 text-black sm:p-0 pb-10 ${
        isOpen ? "w-64" : "w-15"
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
              <Link to={"/"} title="Home">
                SHOP.CO
              </Link>
            </span>
          )}
        </div>
        <button onClick={toggleSidebar} className="text-xl focus:outline-none">
          {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-2 py-4">
        {sidebarMenu.map((ele) => (
          <NavLink
            to={ele.link}
            className={({ isActive }) =>
              cl(
                `flex items-center  px-4 py-3 mb-2 rounded-lg transition hover:bg-gray-500 hover:text-orange-100`,
                isActive ? "bg-gray-600 text-white" : ""
              )
            }
            title={ele.tilte}
          >
            <span className="material-icons text-inherit">
              <ele.icon />
            </span>
            {isOpen && <span className="ml-4 text-inherit">{ele.tilte}</span>}
          </NavLink>
        ))}
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
