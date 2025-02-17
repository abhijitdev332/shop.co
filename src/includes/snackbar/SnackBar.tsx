import React, { useEffect, useState } from "react";
import { FaHome, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import cl from "classnames";
import { useSelector } from "react-redux";
import useUser from "../../hooks/useUser";
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
    <div className="btm-nav z-50 bg-slate-200 sm:hidden">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          cl(isActive ? "active bg-indigo-700 text-white" : "")
        }
      >
        <FaHome />
        <span className="btm-nav-label text-inherit">Home</span>
      </NavLink>
      <NavLink
        to={"/product/category"}
        className={({ isActive }) =>
          cl(
            isActive || paths.includes("product")
              ? "active bg-indigo-700 text-white"
              : ""
          )
        }
      >
        <FaShoppingBag />
        <span className="btm-nav-label text-inherit">Shop</span>
      </NavLink>
      {status && (
        <NavLink
          to={"/user"}
          className={({ isActive }) =>
            cl(isActive ? "active bg-indigo-700 text-white" : "")
          }
        >
          <FaUserCircle />
          <span className="btm-nav-label text-inherit">User</span>
        </NavLink>
      )}

      {isAdmin && (
        <NavLink
          to={"/admin/dash"}
          className={({ isActive }) =>
            cl(
              isActive || paths.includes("admin")
                ? "active bg-indigo-700 text-white"
                : ""
            )
          }
        >
          <MdDashboard />
          <span className="btm-nav-label text-inherit">Admin</span>
        </NavLink>
      )}
    </div>
  );
};

export default SnackBar;
