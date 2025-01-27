import { PrivateAxios } from "../services/api/api";

const getOrderDeatils = async (id) => {
  return await PrivateAxios.get(`/order/${id}`);
};
const getSubsCategory = async () => {
  return await PrivateAxios.get("/subcategory");
};
const newOrder = async (data) => {
  return await PrivateAxios.post("/order/new", data);
};

export { getOrderDeatils, getSubsCategory, newOrder };
