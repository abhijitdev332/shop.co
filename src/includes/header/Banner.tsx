import React from "react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";
import cl from "classnames";
const Banner = () => {
  const isOnline = useOnlineStatus();

  return (
    <div
      id="offline-banner"
      className={cl(
        "duration-200 transition-all py-1",
        !isOnline ? "bg-[#00021f] block " : "hidden"
      )}
    >
      <p className="text-white text-center ">Offline!!</p>
    </div>
  );
};

export default Banner;
