import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useUser = () => {
  const { userDetails, status } = useSelector((store) => store.user);
  const [isAdmin, setAdmin] = useState(userDetails?.roles?.includes("ADMIN"));
  return [userDetails, status];
};

export default useUser;
