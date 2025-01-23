import React from "react";
import cl from "classnames";
const LoaderBtn = ({
  pending = false,
  handleClick = () => null,
  style = "",
  others = {},
  children = "",
}) => {
  return (
    <button
      className={cl("btn btn-neutral flex items-center", style)}
      onClick={handleClick}
      {...others}
    >
      {pending && <span className="loading loading-spinner loading-md"></span>}
      <span>{children}</span>
    </button>
  );
};

export default LoaderBtn;
