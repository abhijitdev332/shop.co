import { PrivateAxios } from "../../services/api/api";

export const getUser = async (id) => {
  let { data } = await PrivateAxios.get(`/user/${id}`);
  return data?.data;
};
export const createUser = async (body) => {
  let { data } = await PrivateAxios.post(`/user/create`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data?.data;
};
export const updateUser = async (id, body) => {};
export const updateUserRole = async (id, body) => {
  let { data } = await PrivateAxios.put(`/user/role/${id}`, body);
  return data;
};
export const deleteUser = async (id) => {
  let { data } = await PrivateAxios.delete(`/user/${id}`);
  return data;
};
