import { useQuery } from "@tanstack/react-query";
import { AdminAxios } from "../../services/api/api";
import { getadminProducts, getadminProductskey } from "./adminApi";

const useAdminProduct = (limit = 5, skip = 0) => {
  return useQuery({
    queryKey: [getadminProductskey],
    queryFn: () => getadminProducts({ limit: limit, skip: skip }),
  });
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
  useAdminProduct,
  adminProductVariant,
  adminAllUser,
  adminOrders,
  adminCategories,
  adminTopCategories,
};
