import { AdminAxios } from "../../services/api/api";
export const getadminProductskey = "getadminproducts";
const getadminProducts = async ({ limit, skip }) => {
  let { data } = await AdminAxios.get(`/products?limit=${limit}&skip=${skip}`);
  return data?.data;
};

export { getadminProducts };
