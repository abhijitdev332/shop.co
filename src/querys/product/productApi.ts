import { useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../../services/api/api";

export const newArrivalKey="newArrivals"


export const getNewArivals = async ({ limit = 4, skip = 0 }) => {
  return await PrivateAxios.get(`/product/arival?limit=${limit}&skip=${skip}`);
};
export const newReview = async ({ id, data }) => {
  return await PrivateAxios.post(`/product/review/add/${id}`, data);
};
export const deleteReview = async (id, reviewId) => {
  return await PrivateAxios.delete(
    `/product/review/remove/${id}?reviewId=${reviewId}`
  );
};
export const getTopSelling = async ({ limit = 4, skip = 0 }) => {
  return await PrivateAxios.get(`/product/top?limit=${limit}&skip=${skip}`);
};
export const getProductById = async (id: string) => {
  return await PrivateAxios.get(`/product/${id}`);
};
export const getAllproducts = async () => {
  return await PrivateAxios.get("/admin/products");
};
export let getProductByCategory = async (query = "") => {
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

export let newProduct = async (productData) => {
  return await PrivateAxios.post("/product/create", productData);
};
export let deleteProduct = async (id) => {
  return await PrivateAxios.delete(`/product/remove/${id}`);
};

export let getProductsByslug = async ({ query = "", limit, skip }) => {
  switch (query.toLowerCase()) {
    case "top":
      return topSelling({ limit, skip });
    case "arrival":
      return newArivals({ limit, skip });
  }
};
export let getProductOrderDetails = async ({ productId, color }) => {
  return await PrivateAxios.get(
    `/product/orders?productId=${productId}&color=${color}`
  );
};
export let getShopAllProducts = async (limit=5, skip=0) => {
  let {data}= await PrivateAxios.get(`/product/shop?limit=${limit}&skip=${skip}`);
  return data?.data
};
export let getRelativeProducts = async (id = "", limit = 5, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `product/relative/${id}?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};



