import { PrivateAxios } from "../../services/api/api";

export const newCart = async (body) => {
  let { data } = await PrivateAxios.post("/cart/create", body);
  return data?.data;
};
export const getUserCart = async (userId) => {
  let { data } = await PrivateAxios.get(`/${userId}`);
  return data?.data;
};
export const updateCart = async (userId = "", body = []) => {
  let { data } = await PrivateAxios.put(`/cart/update/${userId}`, body);
  return data;
};
export const deleteCart = async (userId) => {
  let { data } = await PrivateAxios.delete(`/cart/remove/${userId}`);
  return data;
};

export const addProductToCart = async (userId = "", body = {}) => {
  let { data } = await PrivateAxios.post(`/cart/product/add/${userId}`, body);
  return data;
};
export const removeProductToCart = async (userId = "", body = {}) => {
  let { data } = await PrivateAxios.post(
    `/cart/product/remove/${userId}`,
    body
  );
  return data;
};
