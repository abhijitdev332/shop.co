import { useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../services/api/api";

const newArivals = async ({ limit = 4, skip = 0 }) => {
  return await PrivateAxios.get(`/product/arival?limit=${limit}&skip=${skip}`);
};
const newReview = async ({ id, data }) => {
  return await PrivateAxios.post(`/product/review/add/${id}`, data);
};
const deleteReview = async (id, reviewId) => {
  return await PrivateAxios.delete(
    `/product/review/remove/${id}?reviewId=${reviewId}`
  );
};
const topSelling = async ({ limit = 4, skip = 0 }) => {
  return await PrivateAxios.get(`/product/top?limit=${limit}&skip=${skip}`);
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
let getProductOrderDetails = async ({ productId, color }) => {
  return await PrivateAxios.get(
    `/product/orders?productId=${productId}&color=${color}`
  );
};
let getShopAllProducts = async (limit, skip) => {
  return await PrivateAxios.get(`/product/shop?limit=${limit}&skip=${skip}`);
};
let getRelativeProducts = async (id = "", limit = 5, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `product/relative/${id}?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
let useRelativeProducts = (id = "", limit = 5, skip = 0) => {
  return useQuery({
    queryKey: ["relativeProducts", id],
    queryFn: () => getRelativeProducts(id, limit, skip),
  });
};

export {
  newArivals,
  topSelling,
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
};
