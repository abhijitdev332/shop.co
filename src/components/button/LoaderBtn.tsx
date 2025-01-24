import React from "react";
import cl from "classnames";
const LoaderBtn = ({
  pending = false,
  handleClick = () => null,
  style = "",
  children = "",
  ...others
}) => {
  return (
    <button
      className={cl("btn btn-neutral flex items-center", style)}
      onClick={handleClick}
      {...others}
    >
      {pending && <span className="loading loading-spinner loading-md"></span>}
      {children}
    </button>
  );
};

export default LoaderBtn;
