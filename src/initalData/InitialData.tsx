import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { newArivals } from "../querys/productQuery";
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

const InitialData = () => {
  const dispatch = useDispatch();
  const {
    data: arivalProduct,
    isLoading: arivalLoading,
    isError: arivalErr,
  } = useQuery({
    queryKey: ["products"],
    queryFn: newArivals,
  });
  const {
    data: topProduct,
    isLoading: topLoading,
    isError: topErr,
  } = useQuery({
    queryKey: ["products"],
    queryFn: newArivals,
  });
  const {
    data: category,
    isLoading: categoryLoading,
    isError: categoryErr,
  } = useQuery({
    queryKey: ["category"],
    queryFn: getAllCategory,
  });

  const {
    data: subCategory,
    isLoading: subLoading,
    isError: subErr,
  } = useQuery({
    queryKey: ["subCategory"],
    queryFn: getSubsCategory,
  });
  //   product effect
  useEffect(() => {
    if (arivalProduct?.data || topProduct?.data) {
      dispatch(setArivalProducts(arivalProduct?.data));
      dispatch(setTopProducts(topProduct?.data));
    }
  }, [arivalProduct, topProduct]);
  // categoryEffect
  useEffect(() => {
    if (category?.data || subCategory?.data) {
      dispatch(setCategory(category?.data));
      dispatch(setSubCategory(subCategory?.data));
    }
  }, [category, subCategory]);
  return null;
};

export default InitialData;
