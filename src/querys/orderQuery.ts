import { PrivateAxios } from "../services/api/api";

const getOrderDeatils = async (id) => {
  return await PrivateAxios.get(`/order/${id}`);
};
const newOrder = async (data) => {
  return await PrivateAxios.post("/order/new", data);
};
const userOrders = async (id) => {
  return await PrivateAxios.get(`/order/user/${id}`);
};

export { getOrderDeatils, newOrder, userOrders };
