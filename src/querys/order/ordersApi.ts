import { PrivateAxios } from "../../services/api/api";

export const updateOrderStatus = async (id, data) => {
  let { data } = await PrivateAxios.put(`/order/update/${id}`, data);
  return data?.data;
};
