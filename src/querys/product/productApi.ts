import { PrivateAxios } from "../../services/api/api";

export const newArrivalKey = "newArrivals";

export const getNewArivals = async (limit = 0, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `/product/arival?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
export const newReview = async ({ id, data }) => {
  return await PrivateAxios.post(`/product/review/add/${id}`, data);
};
export const deleteReview = async (id, reviewId) => {
  return await PrivateAxios.delete(
    `/product/review/remove/${id}?reviewId=${reviewId}`
  );
};
export const getTopSelling = async (limit = 0, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `/product/top?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
export const getProductById = async (id: string) => {
  let { data } = await PrivateAxios.get(`/product/${id}`);
  return data?.data;
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
export let getProductOrderDetails = async (productId, color) => {
  let { data } = await PrivateAxios.get(
    `/product/orders?productId=${productId}&color=${color}`
  );
  return data?.data;
};
export let getShopAllProducts = async (limit = 5, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `/product/shop?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
export let getRelativeProducts = async (id = "", limit = 5, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `product/relative/${id}?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
