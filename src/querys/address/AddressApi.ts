import { PrivateAxios } from "../../services/api/api";

export const createAddress = async (body) => {
  let { data } = await PrivateAxios.post("/address/create", body);
  return data?.data;
};
export const getAddress = async (id) => {
  let { data } = await PrivateAxios.get(`/address/${id}`);
  return data?.data;
};
export const deleteAddress = async (id) => {
  let { data } = await PrivateAxios.delete(`/address/${id}`);
  return data;
};
export const getUserAddress = async (userId) => {
  let { data } = await PrivateAxios.get(`/address/user/${userId}`);
  return data?.data;
};
export const updateAddress = async (id, body) => {
  let { data } = await PrivateAxios.put(`/address/update/${id}`, body);
  return data;
};
