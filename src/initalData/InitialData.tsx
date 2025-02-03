import { useEffect } from "react";
import { useGetAllCategory, useGetSubCategory } from "../querys/categoryQuery";
import { useDispatch } from "react-redux";
import {
  setArivalProducts,
  setTopProducts,
} from "../services/store/products/productSlice";
import {
  setCategory,
  setSubCategory,
} from "../services/store/category/categorySlice";
import { removeLoading, setLoading } from "../services/store/loader/loader";
import { useVerifySession } from "../querys/authQuery";
import { setUser } from "../services/store/user/userSlice";
import { getInitalCart } from "../services/store/cart/cartSlice";
import { useNewArivals, useTopSelling } from "../querys/product/productQuery";

const InitialData = () => {
  const dispatch = useDispatch();
  const { data: userData, isLoading: userLoading } = useVerifySession();
  const { data: category, isLoading: categoryLoading } = useGetAllCategory();
  const { data: subCategory, isLoading: subLoading } = useGetSubCategory();
  const { data: arivalProduct, isLoading: arivalLoading } = useNewArivals();
  const { data: topProduct, isLoading: topLoading } = useTopSelling();

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
    if (category || subCategory) {
      dispatch(setCategory(category));
      dispatch(setSubCategory(subCategory));
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
    }
  }, [userData]);
  return null;
};

export default InitialData;
