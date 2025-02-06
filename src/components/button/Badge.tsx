import React from "react";
import cl from "classnames";
const Badge = ({ status = "pending", style = "", ...others }) => {
  return (
    <>
      {status.toLowerCase() == "pending" ? (
        <span
          className={cl(
            "px-2 py-1 rounded-btn capitalize bg-yellow-200 text-yellow-800",
            style
          )}
        >
          {status}
        </span>
      ) : (
        <>
          {status.toLowerCase() == "shipped" ? (
            <span
              className={cl(
                "px-2 py-1 rounded-btn capitalize bg-orange-200 text-orange-800",
                style
              )}
            >
              {status}
            </span>
          ) : (
            <span
              className={cl(
                "px-2 py-1 rounded-btn capitalize  bg-green-200 text-green-800",
                style
              )}
            >
              {status}
            </span>
          )}
        </>
      )}
    </>
  );
};

export default Badge;
