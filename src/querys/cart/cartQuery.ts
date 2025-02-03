import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addProductToCart,
  deleteCart,
  getUserCart,
  newCart,
  removeProductToCart,
  updateCart,
} from "./cartApi";

export const CreateCartMutaion = () => {
  return useMutation({
    mutationKey: ["createcart"],
    mutationFn: (data) => newCart(data),
  });
};
export const useGetUserCart = (userid = "") => {
  return useQuery({
    queryKey: ["getusercart", userid],
    queryFn: () => getUserCart(userid),
  });
};
export const UpdateCartMutation = () => {
  return useMutation({
    mutationKey: ["updatecart"],
    mutationFn: ({ userId, data }) => updateCart(userId, data),
  });
};
export const DeleteCartMutation = () => {
  return useMutation({
    mutationKey: ["deletecart"],
    mutationFn: (userId) => deleteCart(userId),
  });
};
export const AddToCartMutaion = () => {
  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: ({ userId, data }) => addProductToCart(userId, data),
  });
};
export const RemoveFromCartMutaion = () => {
  return useMutation({
    mutationKey: ["removefromcart"],
    mutationFn: ({ userId, data }) => removeProductToCart(userId, data),
  });
};
