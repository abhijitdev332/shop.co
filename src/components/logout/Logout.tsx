import React, { useEffect } from "react";
import cl from "classnames";
import { LogoutMutaion } from "../../querys/authQuery";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../../services/store/user/userSlice";
import { useNavigate } from "react-router-dom";
const Logout = ({ style, children = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutMutaion = LogoutMutaion();
  const handleLogout = async () => {
    logoutMutaion.mutate();
  };
  useEffect(() => {
    if (logoutMutaion.isSuccess) {
      dispatch(removeUser());
      navigate("/");
      toast.success(logoutMutaion.data?.message);
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
