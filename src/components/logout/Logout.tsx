import { useEffect } from "react";
import cl from "classnames";
import { LogoutMutaion } from "../../querys/authQuery";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../services/store/user/userSlice";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../services/store/cart/cartSlice";
import { UpdateCartMutation } from "../../querys/cart/cartQuery";
const Logout = ({ style = "", children = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDetails } = useSelector((store) => store.user);
  const cart = useSelector((store) => store.cart);
  const updateCartMutaion = UpdateCartMutation();
  const logoutMutaion = LogoutMutaion();

  const handleBeforeLogout = () => {
    if (userDetails?._id) {
      updateCartMutaion.mutate({
        userId: userDetails?._id,
        data: { cartTotal: cart?.totalAmount, products: cart?.products },
      });
    }
  };
  const handleLogout = async () => {
    handleBeforeLogout();
    logoutMutaion.mutate();
  };
  useEffect(() => {
    if (logoutMutaion.isSuccess) {
      dispatch(removeUser());
      dispatch(resetCart());
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
