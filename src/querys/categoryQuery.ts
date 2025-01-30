import { PrivateAxios } from "../services/api/api";

const getAllCategory = async (limit = 5, skip = 0) => {
  return await PrivateAxios.get(`/category?limit=${limit}&skip=${skip}`);
};
const getSubsCategory = async (limit = 5, skip = 0) => {
  return await PrivateAxios.get(`/subcategory?limit=${limit}&skip=${skip}`);
};

const getProductsByCategory = async (query = "") => {
  return await PrivateAxios.get(
    `/product/category?query=${query.toLowerCase()}`
  );
};
const getProductsBySubCategory = async (query = "") => {
  return await PrivateAxios.get(
    `/product/subCategory?query=${query.toLowerCase()}`
  );
};

const createCategory = async (data) => {
  return await PrivateAxios.post("/category/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const createSubCategory = async (data) => {
  return await PrivateAxios.post("/subcategory/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteCategory = async (id) => {
  return await PrivateAxios.delete(`/category/remove/${id}`);
};
const deleteSubsCategory = async (id) => {
  return await PrivateAxios.delete(`/subcategory/remove/${id}`);
};
const updateCategory = async (id, data) => {
  return await PrivateAxios.put(`/category/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const updateSubCategory = async (id, data) => {
  return await PrivateAxios.put(`/subcategory/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  getAllCategory,
  getSubsCategory,
  createCategory,
  createSubCategory,
  deleteCategory,
  deleteSubsCategory,
  getProductsByCategory,
  getProductsBySubCategory,
  updateCategory,
  updateSubCategory,
};
