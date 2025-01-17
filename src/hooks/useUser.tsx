import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const useUser = () => {
  const { userDetails, status } = useSelector((store) => store.user);
  return [userDetails, status];
};

export default useUser;
