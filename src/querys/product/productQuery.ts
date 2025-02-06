import { useMutation, useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../../services/api/api";
import {
  getNewArivals,
  getProductByCategory,
  getProductById,
  getProductOrderDetails,
  getProductsByslug,
  getQueryItems,
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

let newProduct = async (productData) => {
  return await PrivateAxios.post("/product/create", productData);
};
let deleteProduct = async (id) => {
  return await PrivateAxios.delete(`/product/remove/${id}`);
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
export const useShopGetAllProducts = (limit, skip, query) => {
  return useQuery({
    queryKey: ["shopallproducts", limit, skip, { ...query }],
    queryFn: () => getShopAllProducts(limit, skip, query),
  });
};
export const useGetProductByCategory = (query = "") => {
  return useQuery({
    queryKey: ["categoryProducts", query],
    queryFn: () => getProductByCategory(query),
  });
};
export const useGetProductBySlug = (query = "", limit, skip) => {
  return useQuery({
    queryKey: ["getproductbyslug", query, limit, skip],
    queryFn: () => getProductsByslug(query, limit, skip),
  });
};
export const useQueryItems = (query: string) => {
  return useQuery({
    queryKey: ["getqueryitems", query || ""], // Ensure it's always a string
    queryFn: () => getQueryItems(query),
    enabled: Boolean(query), // Prevent execution on empty query
  });
};

export {
  useAllProducts,
  getProduct,
  getAllproducts,
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
