import { useQuery } from "@tanstack/react-query";
import { AdminAxios } from "../../services/api/api";
import {
  getAdminCategories,
  getAdminOrderByCountry,
  getAdminOrders,
  getAdminOrderStats,
  getadminProducts,
  getAdminStats,
  getAdminUsers,
} from "./adminApi";

export const getadminProductskey = "getadminproducts";
export const getadminOrdersKey = "getadminOrders";
export const getadminUserskey = "adminusers";
export const getadminCategorykey = "admincategories";
const useAdminProduct = (limit = 5, skip = 0) => {
  return useQuery({
    queryKey: [getadminProductskey, skip],
    queryFn: () => getadminProducts({ limit: limit, skip: skip }),
  });
};
const adminProductVariant = async () => {
  return await AdminAxios.get("/products/variant");
};
const useAdminAllUser = (currentPage = 1, itemsPerPage = 5) => {
  return useQuery({
    queryKey: [getadminUserskey, currentPage],
    queryFn: () =>
      getAdminUsers(
        currentPage * itemsPerPage,
        (currentPage - 1) * itemsPerPage
      ),
  });
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

const adminTopCategories = async ({ limit = 5, skip = 0 }) => {
  return await AdminAxios.get(`/categories/top?limit=${limit}&skip=${skip}`);
};

const useAdminStats = () => {
  return useQuery({
    queryKey: ["adminstats"],
    queryFn: getAdminStats,
    gcTime: 1000 * 60 * 5,
  });
};
const useAdminOrderStats = (time) => {
  return useQuery({
    queryKey: ["adminorderstats", time],
    queryFn: () => getAdminOrderStats(time),
    gcTime: 1000 * 60 * 5,
  });
};
const useAdminOrdersByCountry = () => {
  return useQuery({
    queryKey: ["adminorderbycountry"],
    queryFn: getAdminOrderByCountry,
    gcTime: 1000 * 60 * 5,
  });
};

export const useAdminCategories = () => {
  return useQuery({
    queryKey: [getadminCategorykey],
    queryFn: getAdminCategories,
  });
};
export {
  useAdminProduct,
  adminProductVariant,
  useAdminAllUser,
  useAdminOrders,
  adminTopCategories,
  useAdminStats,
  useAdminOrderStats,
  useAdminOrdersByCountry,
};
