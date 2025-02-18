import React, { useEffect, useState } from "react";
import { FaHome, FaPlus, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import cl from "classnames";
import { useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
import { IoBag, IoHomeOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";

// style
import style from "./style.module.scss";
const SnackBar = () => {
  const { pathname } = useLocation();
  const { userDetails } = useSelector((store) => store.user);
  const [isAdmin, setAdmin] = useState(userDetails?.roles?.includes("ADMIN"));
  const [paths, setPaths] = useState(() => {
    return pathname.split("/");
  });
  const [_, status] = useUser();

  useEffect(() => {
    setAdmin(userDetails?.roles?.includes("ADMIN"));
  }, [userDetails]);

  return (
    <div className="btm-nav justify-around  py-2 z-50 bg-gray-50 sm:hidden">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          cl(
            "basis-0 h-fit  transition-all duration-200 relative",
            isActive ? style.active : style.link
          )
        }
      >
        <div className="icon">
          <IoMdHome size={25} />
        </div>

        <span className="btm-nav-label text-inherit">Home</span>
      </NavLink>
      <NavLink
        to={"/product/category"}
        className={({ isActive }) =>
          cl(
            "basis-0 h-fit p-2  transition-all duration-200",
            isActive || paths.includes("product") ? style.active : style.link
          )
        }
      >
        <div className="icon">
          <IoBag size={25} />
        </div>

        <span className="btm-nav-label text-inherit">Shop</span>
      </NavLink>
      {status && (
        <NavLink
          to={"/user"}
          className={({ isActive }) =>
            cl(
              "basis-0 h-fit  transition-all duration-200 relative",
              isActive ? style.active : style.link
            )
          }
        >
          <div className="icon">
            <FaUserCircle size={25} />
          </div>
          <span className="btm-nav-label text-inherit">User</span>
        </NavLink>
      )}
      {isAdmin && (
        <NavLink
          to={"/admin/dash"}
          className={({ isActive }) =>
            cl(
              "basis-0 h-fit  transition-all duration-200 relative",
              isActive || paths.includes("/admin") ? style.active : style.link
            )
          }
        >
          <div className="icon">
            <MdDashboard size={25} />
          </div>
          <span className="btm-nav-label text-inherit">Admin</span>
        </NavLink>
      )}
    </div>
  );
};

export default SnackBar;
