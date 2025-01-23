import { PrivateAxios } from "../services/api/api";

const getUser = async (id) => {
  return await PrivateAxios.get(`/user/${id}`);
};
const createUser = async (data) => {
  return await PrivateAxios.post(`/user/create`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteUser = async (id) => {
  return await PrivateAxios.delete(`/user/${id}`);
};

export { createUser, getUser, deleteUser };
