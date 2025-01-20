import React, { useEffect } from "react";
import cl from "classnames";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../querys/authQuery";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUser } from "../../services/store/user/userSlice";
const Logout = ({ style, children = "" }) => {
  const dispatch = useDispatch();
  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      dispatch(removeUser());
    },
  });
  const handleLogout = async () => {
    mutate();
  };
  useEffect(() => {
    if (isError) {
      toast.error(error?.response?.data?.message);
    }
  }, [isError]);
  return (
    <button
      onClick={handleLogout}
      className={cl("btn", style)}
      disabled={isError || isPending}
    >
      {isPending && (
        <span className="loading loading-spinner text-white loading-md"></span>
      )}
      {children}
    </button>
  );
};

export default Logout;
