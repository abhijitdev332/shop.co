import { PrivateAxios } from "../../services/api/api";
export const getAllCategory = async (limit = 0, skip = 0) => {
  const { data } = await PrivateAxios.get(
    `/category?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
export const getProductByCategory = async (query, limit = 5, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `/product/category?query=${query.toLowerCase()}`
  );
  return data?.data;
};
export const updateCategory = async (id, body) => {
  let { data } = await PrivateAxios.put(`/category/update/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const deleteCategory = async (id = "") => {
  let { data } = await PrivateAxios.delete(`/category/remove/${id}`);
  return data;
};
