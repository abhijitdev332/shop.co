import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewOrder,
  getOrderDeatils,
  getUserOrders,
  updateOrderStatus,
} from "./ordersApi";

export const CreateOrderMutation = () => {
  return useMutation({
    mutationKey: ["neworder"],
    mutationFn: (data) => createNewOrder(data),
  });
};
export const useGetUserOrders = (userid) => {
  return useQuery({
    queryKey: ["userorders"],
    queryFn: () => getUserOrders(userid),
  });
};
export const useGetOrderDetails = (orderId) => {
  return useQuery({
    queryKey: ["getorder", orderId],
    queryFn: () => getOrderDeatils(orderId),
  });
};
export const UpdateOrderStausMutaion = () => {
  return useMutation({
    mutationKey: ["updateorderstatus"],
    mutationFn: ({ id, data }) => updateOrderStatus(id, data),
  });
};
