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
      let { data: genderdata } = await PrivateAxios.get(
        `/product?gender=${query}`
      );
      return genderdata?.data;

    case "female":
      let { data: female } = await PrivateAxios.get(`/product?gender=${query}`);
      return female?.data;

    case "sale":
      let { data: saledata } = await PrivateAxios.get(`/product/sale`);
      return saledata?.data;

    case "new arrivel":
      let { data: arrival } = await PrivateAxios.get(`/product/arival`);
      return arrival?.data;

    default:
      let { data: categoryData } = await PrivateAxios.get(
        `/product/category?query=${query.toLowerCase()}`
      );
      return categoryData?.data;
  }
};
export let newProduct = async (productData) => {
  return await PrivateAxios.post("/product/create", productData);
};
export let deleteProduct = async (id) => {
  return await PrivateAxios.delete(`/product/remove/${id}`);
};
export let getProductsByslug = async (query = "", limit = 5, skip = 0) => {
  switch (query.toLowerCase()) {
    case "top":
      return getTopSelling(limit, skip);
    case "arrival":
      return getNewArivals(limit, skip);
  }
};
export let getProductOrderDetails = async (productId, color) => {
  let { data } = await PrivateAxios.get(
    `/product/orders?productId=${productId}&color=${color}`
  );
  return data?.data;
};
export let getShopAllProducts = async (limit = 5, skip = 0, query = {}) => {
  const queryParams = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
    ...Object.fromEntries(
      Object.entries(query).map(([key, value]) => [key, String(value)])
    ),
  });
  let { data } = await PrivateAxios.get(`/product/shop?${queryParams}`);
  return data?.data;
};
export let getRelativeProducts = async (id = "", limit = 5, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `product/relative/${id}?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
export const updateProduct = async (productId = "", body = "") => {
  let { data } = await PrivateAxios.put(`/product/update/${productId}`, body);
  return data;
};
export const getQueryItems = async (query = "") => {
  let { data } = await PrivateAxios.get(`/product/query?query=${query}`);
  return data?.data;
};
