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

export { getadminProducts, getAdminOrders };
