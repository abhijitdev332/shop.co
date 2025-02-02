import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCart, getUserCart, newCart, updateCart } from "./cartApi";

const CreateCartMutaion = () => {
  return useMutation({
    mutationKey: ["createcart"],
    mutationFn: (data) => newCart(data),
  });
};
const useGetUserCart = (userid = "") => {
  return useQuery({
    queryKey: ["getusercart", userid],
    queryFn: () => getUserCart(userid),
  });
};
const UpdateCartMutation = () => {
  return useMutation({
    mutationKey: ["updatecart"],
    mutationFn: ({userId,data}) => updateCart(userId, data),
  });
};
const DeleteCartMutation = () => {
  return useMutation({
    mutationKey: ["deletecart"],
    mutationFn: (userId) => deleteCart(userId),
  });
};

export {
  CreateCartMutaion,
  useGetUserCart,
  UpdateCartMutation,
  DeleteCartMutation,
};
