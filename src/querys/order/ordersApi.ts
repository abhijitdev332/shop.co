import { PrivateAxios } from "../../services/api/api";

export const updateOrderStatus = async (id, body) => {
  let { data } = await PrivateAxios.put(`/order/update/${id}`, body);
  return data?.data;
};
export const getOrderDeatils = async (id) => {
  let { data } = await PrivateAxios.get(`/order/${id}`);
  return data?.data;
};
