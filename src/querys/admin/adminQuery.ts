import { useQuery } from "@tanstack/react-query";
import { AdminAxios } from "../../services/api/api";
import {
  getAdminOrders,
  getadminOrdersKey,
  getadminProducts,
  getadminProductskey,
  getAdminStats,
} from "./adminApi";

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
const useAdminOrders = (currentPage = 1, itemsPerPage = 5) => {
  return useQuery({
    queryKey: [getadminOrdersKey, currentPage],
    queryFn: () =>
      getAdminOrders(
        currentPage * itemsPerPage,
        (currentPage - 1) * itemsPerPage
      ),
  });
};
const adminCategories = async () => {
  return await AdminAxios.get("/categories");
};
const adminTopCategories = async ({ limit = 5, skip = 0 }) => {
  return await AdminAxios.get(`/categories/top?limit=${limit}&skip=${skip}`);
};

const useAdminStats = async () => {
  return useQuery({
    queryKey: ["adminstats"],
    queryFn: getAdminStats,
  });
};

export {
  useAdminProduct,
  adminProductVariant,
  adminAllUser,
  useAdminOrders,
  adminCategories,
  adminTopCategories,
  useAdminStats,
};
