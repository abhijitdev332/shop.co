import { PrivateAxios } from "../services/api/api";

const createAddress = async (data) => {
  return await PrivateAxios.post("/address/create", data);
};
const getAddress = async (id) => {
  return await PrivateAxios.get(`/address/${id}`);
};
const deleteAddress = async (id) => {
  return await PrivateAxios.delete(`/address/${id}`);
};
const getUserAddress = async (userId) => {
  return await PrivateAxios.get(`/address/user/${userId}`);
};

export { createAddress, getAddress, getUserAddress, deleteAddress };
