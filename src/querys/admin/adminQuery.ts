import { AdminAxios } from "../../services/api/api";

const adminProduct = async () => {
  return await AdminAxios.get("/products");
};
const adminProductVariant = async () => {
  return await AdminAxios.get("/products/variant");
};
const adminUser = async () => {
  return await AdminAxios.get("/users");
};
const adminOrders = async () => {
  return await AdminAxios.get("/orders");
};
const adminCategories = async () => {
  return await AdminAxios.get("/categories");
};

export {
  adminProduct,
  adminProductVariant,
  adminUser,
  adminOrders,
  adminCategories,
};
