import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { newArivals } from "../querys/productQuery";
import { getAllCategory, getSubsCategory } from "../querys/categoryQuery";
import { useDispatch } from "react-redux";

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
    dispatch();
  }, [arivalProduct, topProduct]);
  // categoryEffect
  useEffect(() => {}, []);
  return null;
};

export default InitialData;
