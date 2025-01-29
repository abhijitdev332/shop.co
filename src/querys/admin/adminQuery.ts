import { AdminAxios } from "../../services/api/api";

const adminProduct = async () => {
  return await AdminAxios.get("/products");
};
const adminProductVariant = async () => {
  return await AdminAxios.get("/products/variant");
};
const adminAllUser = async () => {
  return await AdminAxios.get("/users");
};
const adminOrders = async ({ limit = 5, skip = 0 }) => {
  return await AdminAxios.get(`/orders?limit=${limit}&skip=${skip}`);
};
const adminCategories = async () => {
  return await AdminAxios.get("/categories");
};
const adminTopCategories = async ({ limit = 5, skip = 0 }) => {
  return await AdminAxios.get(`/categories/top?limit=${limit}&skip=${skip}`);
};

export {
  adminProduct,
  adminProductVariant,
  adminAllUser,
  adminOrders,
  adminCategories,
  adminTopCategories,
};
