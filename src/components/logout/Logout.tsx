import React from "react";
import cl from "classnames";
const Logout = ({ style, children = "" }) => {
  const handleLogout = async () => {};
  return (
    <button onClick={handleLogout} className={cl("btn", style)}>
      {children}
    </button>
  );
};

export default Logout;
