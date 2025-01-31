import { AdminAxios } from "../../services/api/api";
export const getadminProductskey = "getadminproducts";
export const getadminOrdersKey = "getadminOrders";
const getadminProducts = async ({ limit, skip }) => {
  let { data } = await AdminAxios.get(`/products?limit=${limit}&skip=${skip}`);
  return data?.data;
};
const getAdminOrders = async (limit = 5, skip = 0) => {
  let { data } = await AdminAxios.get(`/orders?limit=${limit}&skip=${skip}`);
  return data?.data;
};
const getAdminUsers = async (limit = 5, skip = 0) => {
  let { data } = await AdminAxios.get(`/users?limit=${limit}&skip=${skip}`);
  return data?.data;
};
const getAdminStats = async () => {
  let { data } = await AdminAxios.get(`/stats`);
  return data?.data;
};
const getAdminOrderStats = async (time = "7d") => {
  let { data } = await AdminAxios.get(`/orderStats?range=${time}`);
  return data?.data;
};
const getAdminOrderByCountry = async () => {
  let { data } = await AdminAxios.get(`/byCountry`);
  return data?.data;
};

export {
  getadminProducts,
  getAdminOrders,
  getAdminStats,
  getAdminOrderStats,
  getAdminOrderByCountry,
  getAdminUsers,
};
