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
export const useGetUserOrders = (userid: string) => {
  return useQuery({
    queryKey: ["userorders", userid],
    queryFn: () => getUserOrders(userid, 0, 0),
    enabled: !!userid,
  });
};
export const useGetOrderDetails = (orderId: string) => {
  return useQuery({
    queryKey: ["getorder", orderId],
    queryFn: () => getOrderDeatils(orderId),
  });
};
export const UpdateOrderStausMutaion = () => {
  return useMutation({
    mutationKey: ["updateorderstatus"],
    mutationFn: ({ id, data }: { id: string; data: {} }) =>
      updateOrderStatus(id, data),
  });
};
