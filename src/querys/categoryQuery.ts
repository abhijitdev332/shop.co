import { useMutation, useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../services/api/api";
import {
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "./categories/categoryApi";
import {
  deleteSubCategory,
  getProductsBySubCategory,
  getSubCategory,
  updateSubCategory,
} from "./subcategory/subCategoryapi";
import { getProductByCategory } from "./product/productApi";

export const useGetAllCategory = (currentPage = 0, itemsperPage = 0) => {
  return useQuery({
    queryKey: ["allcategory"],
    queryFn: () =>
      getAllCategory(
        currentPage * itemsperPage,
        (currentPage - 1) * itemsperPage
      ),
  });
};
// create new
const createCategory = async (data) => {
  return await PrivateAxios.post("/category/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const createSubCategory = async (data) => {
  return await PrivateAxios.post("/subcategory/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
// category
export const useGetCategoryProducts = (query, limit = 5, skip = 0) => {
  return useQuery({
    queryKey: ["getcategoryproducts", query, limit, skip],
    queryFn: () => getProductByCategory(query, limit, skip),
  });
};
export const DeleteCategoryMutaion = () => {
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id) => deleteCategory(id),
  });
};
export const UpdateCategoryMutaion = () => {
  return useMutation({
    mutationKey: ["updatecategory"],
    mutationFn: ({ id, data }) => updateCategory(id, data),
  });
};
// subCategory
export const useGetSubCategory = (currentPage = 0, itemsperPage = 0) => {
  return useQuery({
    queryKey: ["adminsubcategory"],
    queryFn: () =>
      getSubCategory(
        currentPage * itemsperPage,
        (currentPage - 1) * itemsperPage
      ),
  });
};
export const useGetSubCategoryProducts = (query = "", limit = 5, skip = 0) => {
  return useQuery({
    queryKey: ["getsubcategoryproducts", query, limit, skip],
    queryFn: () => getProductsBySubCategory(query, limit, skip),
  });
};
export const DeleteSubCategoryMutaion = () => {
  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id) => deleteSubCategory(id),
  });
};

export const UpdateSubCategoryMutaion = () => {
  return useMutation({
    mutationKey: ["updatecategory"],
    mutationFn: ({ id, data }) => updateSubCategory(id, data),
  });
};
export { getAllCategory, createCategory, createSubCategory, deleteCategory };
