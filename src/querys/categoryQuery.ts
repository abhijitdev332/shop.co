import { PrivateAxios } from "../services/api/api";

const getAllCategory = async () => {
  return await PrivateAxios.get("/category");
};
const getSubsCategory = async () => {
  return await PrivateAxios.get("/subcategory");
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

export {
  getAllCategory,
  getSubsCategory,
  createCategory,
  createSubCategory,
  deleteCategory,
  deleteSubsCategory,
  getProductsByCategory,
  getProductsBySubCategory,
};
