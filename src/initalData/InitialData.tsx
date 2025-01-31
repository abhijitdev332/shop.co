import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { newArivals, topSelling } from "../querys/productQuery";
import { getAllCategory, getSubsCategory } from "../querys/categoryQuery";
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

const InitialData = () => {
  const dispatch = useDispatch();
  const {
    data: arivalProduct,
    isLoading: arivalLoading,
    isError: arivalErr,
  } = useSuspenseQuery({
    queryKey: ["products", "arrivals"],
    queryFn: newArivals,
  });
  const {
    data: topProduct,
    isLoading: topLoading,
    isError: topErr,
  } = useSuspenseQuery({
    queryKey: ["products", "top"],
    queryFn: topSelling,
  });
  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryErr,
  } = useSuspenseQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
  });

  const {
    data: subCategory,
    isLoading: subLoading,
    isError: subErr,
  } = useSuspenseQuery({
    queryKey: ["subCategory"],
    queryFn: getSubsCategory,
  });
  //   product effect
  useEffect(() => {
    if (arivalLoading || topLoading) {
      dispatch(setLoading());
    }
    if (arivalProduct?.data || topProduct?.data) {
      dispatch(setArivalProducts(arivalProduct?.data));
      dispatch(setTopProducts(topProduct?.data));
      dispatch(removeLoading());
    }
  }, [arivalProduct, topProduct]);
  // categoryEffect
  useEffect(() => {
    if (categoryLoading || subLoading) {
      dispatch(setLoading());
    }
    if (category?.data || subCategory?.data) {
      dispatch(setCategory(category?.data));
      dispatch(setSubCategory(subCategory?.data));
      dispatch(removeLoading());
    }
  }, [category, subCategory]);
  return null;
};

export default InitialData;
