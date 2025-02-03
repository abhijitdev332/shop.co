import { PrivateAxios } from "../../services/api/api";
export const getSubCategory = async (limit = 0, skip = 0) => {
  let { data } = await PrivateAxios.get(
    `/subcategory?limit=${limit}&skip=${skip}`
  );
  return data?.data;
};
export const deleteSubCategory = async (id) => {
  let { data } = await PrivateAxios.delete(`/subcategory/remove/${id}`);
  return data;
};

export const updateSubCategory = async (id, body) => {
  let { data } = await PrivateAxios.put(`/subcategory/update/${id}`, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
