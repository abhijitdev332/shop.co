import { PrivateAxios } from "../../services/api/api";
export const createNewOrder = async (body) => {
  return await PrivateAxios.post("/order/new", body);
};
export const updateOrderStatus = async (id, body) => {
  let { data } = await PrivateAxios.put(`/order/update/${id}`, body);
  return data;
};
export const getOrderDeatils = async (id) => {
  let { data } = await PrivateAxios.get(`/order/${id}`);
  return data?.data;
};
export const getUserOrders = async (id) => {
  let { data } = await PrivateAxios.get(`/order/user/${id}`);
  return data?.data;
};
