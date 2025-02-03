import React, { useEffect } from "react";
import cl from "classnames";
import { LogoutMutaion } from "../../querys/authQuery";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../../services/store/user/userSlice";
const Logout = ({ style, children = "" }) => {
  const dispatch = useDispatch();
  const logoutMutaion = LogoutMutaion();
  const handleLogout = async () => {
    logoutMutaion.mutate();
  };
  useEffect(() => {
    if (logoutMutaion.isSuccess) {
      dispatch(removeUser());
      toast.error(logoutMutaion.data?.message);
    }
  }, [logoutMutaion.isSuccess]);
  return (
    <button
      onClick={handleLogout}
      className={cl("btn", style)}
      disabled={logoutMutaion.isError || logoutMutaion.isPending}
    >
      {logoutMutaion.isPending && (
        <span className="loading loading-spinner text-white loading-md"></span>
      )}
      {children}
    </button>
  );
};

export default Logout;
