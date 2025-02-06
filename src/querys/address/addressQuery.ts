import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getUserAddress,
} from "./AddressApi";

export const useGetAddress = (id) => {
  return useQuery({
    queryKey: ["getaddress", id],
    queryFn: () => getAddress(id),
  });
};
export const useGetUserAddress = (userId = "") => {
  return useQuery({
    queryKey: ["getuseraddress", userId],
    queryFn: () => getUserAddress(userId),
  });
};
export const CreateAddressMutaion = () => {
  return useMutation({
    mutationKey: ["createaddress"],
    mutationFn: (data) => createAddress(data),
  });
};
export const DeleteAddressMutaion = () => {
  return useMutation({
    mutationKey: ["deleteaddress"],
    mutationFn: (id) => deleteAddress(id),
  });
};
