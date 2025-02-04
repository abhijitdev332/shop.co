import { useMutation, useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../../services/api/api";
import {
  getNewArivals,
  getProductById,
  getProductOrderDetails,
  getRelativeProducts,
  getShopAllProducts,
  getTopSelling,
  updateProduct,
} from "./productApi";

export const useNewArivals = (currentPage = 1, itemsperpage = 5) => {
  return useQuery({
    queryKey: ["newarrivals"],
    queryFn: () =>
      getNewArivals(
        currentPage * itemsperpage,
        (currentPage - 1) * itemsperpage
      ),
  });
};
const newReview = async ({ id, data }) => {
  return await PrivateAxios.post(`/product/review/add/${id}`, data);
};
const deleteReview = async (id, reviewId) => {
  return await PrivateAxios.delete(
    `/product/review/remove/${id}?reviewId=${reviewId}`
  );
};
export const useTopSelling = (currentPage = 1, itemsperpage = 5) => {
  return useQuery({
    queryKey: ["topselling"],
    queryFn: () =>
      getTopSelling(
        currentPage * itemsperpage,
        (currentPage - 1) * itemsperpage
      ),
  });
};
const getProduct = async (id: string) => {
  return await PrivateAxios.get(`/product/${id}`);
};
const getAllproducts = async () => {
  return await PrivateAxios.get("/admin/products");
};
let getProductByCategory = async (query = "") => {
  switch (query) {
    case "male":
      return await PrivateAxios.get(`/product?gender=${query}`);

    case "female":
      return await PrivateAxios.get(`/product?gender=${query}`);

    case "sale":
      return await PrivateAxios.get(`/product/sale`);

    case "new arrivel":
      return await PrivateAxios.get(`/product/arival`);

    default:
      return await PrivateAxios.get(
        `/product/category?query=${query.toLowerCase()}`
      );
  }
};

let newProduct = async (productData) => {
  return await PrivateAxios.post("/product/create", productData);
};
let deleteProduct = async (id) => {
  return await PrivateAxios.delete(`/product/remove/${id}`);
};

let getProductsByslug = async ({ query = "", limit, skip }) => {
  switch (query.toLowerCase()) {
    case "top":
      return topSelling({ limit, skip });
    case "arrival":
      return newArivals({ limit, skip });
  }
};
let useProductOrderDetails = (productId = "", color = "") => {
  return useQuery({
    queryKey: ["productorders", productId, color],
    queryFn: () => getProductOrderDetails(productId, color),
  });
};
let useAllProducts = (limit, skip) => {
  return useQuery({
    queryKey: ["getallproducts"],
    queryFn: () => getShopAllProducts(limit, skip),
  });
};

let useRelativeProducts = (id = "", limit = 5, skip = 0) => {
  return useQuery({
    queryKey: ["relativeProducts", id],
    queryFn: () => getRelativeProducts(id, limit, skip),
  });
};
export const getProductByIdKey = "getproductbyid";
export const useGetProductById = (id = "") => {
  return useQuery({
    queryKey: [getProductByIdKey, id],
    queryFn: () => getProductById(id),
  });
};
export const UpdateProductMutation = () => {
  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: ({ id, data }) => updateProduct(id, data),
  });
};

export {
  useAllProducts,
  getProduct,
  getAllproducts,
  getProductByCategory,
  newProduct,
  deleteReview,
  deleteProduct,
  getProductsByslug,
  newReview,
  getProductOrderDetails,
  getShopAllProducts,
  useRelativeProducts,
  useProductOrderDetails,
};
