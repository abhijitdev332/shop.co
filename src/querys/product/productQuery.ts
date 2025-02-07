import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProduct,
  deleteReview,
  getNewArivals,
  getProductByCategory,
  getProductById,
  getProductOrderDetails,
  getProductsByslug,
  getQueryItems,
  getRelativeProducts,
  getShopAllProducts,
  getTopSelling,
  newProduct,
  newReview,
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
export let useProductOrderDetails = (productId = "", color = "") => {
  return useQuery({
    queryKey: ["productorders", productId, color],
    queryFn: () => getProductOrderDetails(productId, color),
  });
};
export let useAllProducts = (limit, skip) => {
  return useQuery({
    queryKey: ["getallproducts"],
    queryFn: () => getShopAllProducts(limit, skip),
  });
};
export let useRelativeProducts = (id = "", limit = 5, skip = 0) => {
  return useQuery({
    queryKey: ["relativeProducts", id],
    queryFn: () => getRelativeProducts(id, limit, skip),
  });
};
export const getProductByIdKey = "getproductbyid";
// product crud
export const CreateNewProduct = () => {
  return useMutation({
    mutationKey: ["newproduct"],
    mutationFn: (data) => newProduct(data),
  });
};
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
export const DeleteProductMutaion = () => {
  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id) => deleteProduct(id),
  });
};
// bulk products
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
// reviews
export const CreateNewReviewMutation = () => {
  return useMutation({
    mutationKey: ["newreview"],
    mutationFn: ({ id, data }) => newReview(id, data),
  });
};
export const DeleteReviewMutation = () => {
  return useMutation({
    mutationKey: ["deletereview"],
    mutationFn: ({ id, reviewId }) => deleteReview(id, reviewId),
  });
};
