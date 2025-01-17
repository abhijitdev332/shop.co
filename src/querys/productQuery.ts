import { PrivateAxios } from "../services/api/api";

const newArivals = async () => {
  return await PrivateAxios.get("/product/arival");
};
const topSelling = async () => {
  return await PrivateAxios.get("/product/top");
};
const getProduct = async (id) => {
  return await PrivateAxios.get(`/product/${id}`);
};

export { newArivals, topSelling, getProduct };
