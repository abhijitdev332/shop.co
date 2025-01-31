import { useQuery } from "@tanstack/react-query";
import { AdminAxios } from "../../services/api/api";
import {
  getAdminOrderByCountry,
  getAdminOrders,
  getadminOrdersKey,
  getAdminOrderStats,
  getadminProducts,
  getadminProductskey,
  getAdminStats,
  getAdminUsers,
} from "./adminApi";

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
    queryKey: ["adminalluser", currentPage],
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
const adminCategories = async () => {
  return await AdminAxios.get("/categories");
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

export {
  useAdminProduct,
  adminProductVariant,
  useAdminAllUser,
  useAdminOrders,
  adminCategories,
  adminTopCategories,
  useAdminStats,
  useAdminOrderStats,
  useAdminOrdersByCountry,
};
