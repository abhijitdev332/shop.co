import React from "react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import cl from "classnames";
const Banner = () => {
  const isOnline = useOnlineStatus();

  return (
    <div
      id="offline-banner"
      className={cl(
        !isOnline
          ? "bg-[#00021f] block duration-200 transition-all py-1"
          : "hidden"
      )}
    >
      <p className="text-white text-center ">Please Check Network! </p>
    </div>
  );
};

export default Banner;
