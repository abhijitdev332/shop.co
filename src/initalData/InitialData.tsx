import { useEffect } from "react";
import { useGetAllCategory, useGetSubCategory } from "../querys/categoryQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  setArivalProducts,
  setTopProducts,
} from "../services/store/products/productSlice";
import {
  setCategory,
  setCategoryData,
  setSubCategory,
} from "../services/store/category/categorySlice";
import { removeLoading, setLoading } from "../services/store/loader/loader";
import { useVerifySession } from "../querys/authQuery";
import { setUser } from "../services/store/user/userSlice";
import { getInitalCart } from "../services/store/cart/cartSlice";
import { useNewArivals, useTopSelling } from "../querys/product/productQuery";
import { UpdateCartMutation } from "../querys/cart/cartQuery";

const InitialData = () => {
  const dispatch = useDispatch();
  const cart = useSelector((store) => store.cart);
  const { data: userData, isLoading: userLoading } = useVerifySession();
  const { data: category, isLoading: categoryLoading } = useGetAllCategory();
  const { data: subCategory, isLoading: subLoading } = useGetSubCategory();
  const { data: arivalProduct, isLoading: arivalLoading } = useNewArivals();
  const { data: topProduct, isLoading: topLoading } = useTopSelling();
  const updateCartMutaion = UpdateCartMutation();
  //   product effect
  useEffect(() => {
    if (arivalLoading || topLoading) {
      dispatch(setLoading());
    }
    if (arivalProduct || topProduct) {
      dispatch(setArivalProducts(arivalProduct));
      dispatch(setTopProducts(topProduct));
      dispatch(removeLoading());
    }
  }, [arivalProduct, topProduct]);
  // categoryEffect
  useEffect(() => {
    if (categoryLoading || subLoading) {
      dispatch(setLoading());
    }
    if (!categoryLoading && !subLoading && category && subCategory) {
      dispatch(setCategoryData({ category, subCategory }));
      dispatch(removeLoading());
    }
  }, [category, subCategory]);

  useEffect(() => {
    if (userLoading) {
      dispatch(setLoading());
    }
    if (userData) {
      dispatch(setUser(userData));
      dispatch(getInitalCart(userData?._id));
      dispatch(removeLoading());
    }
  }, [userData]);
  // update cart before unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userData?._id) {
        updateCartMutaion.mutate({
          userId: userData?._id,
          data: { cartTotal: cart?.totalAmount, products: cart?.products },
        });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [cart, userData]);

  return null;
};

export default InitialData;
