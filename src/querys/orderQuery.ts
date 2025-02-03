import { useMutation } from "@tanstack/react-query";
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
const updateOrderStatus = async (id, data) => {
  return await PrivateAxios.put(`/order/update/${id}`, data);
};

export const UpdateOrderStausMutaion = () => {
  return useMutation({
    mutationKey: ["updateorderstatus"],
    mutationFn: ({ id, data }) => updateOrderStatus(id, data),
  });
};

export { getOrderDeatils, newOrder, userOrders, updateOrderStatus };
