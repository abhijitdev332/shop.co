import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, deleteUser, getUser, updateUser } from "./userApi";

export const useGetUserById = (id) => {
  return useQuery({
    queryKey: ["getuser", id],
    queryFn: () => getUser(id),
  });
};

export const CreateUserMutaion = () => {
  return useMutation({
    mutationKey: ["createuser"],
    mutationFn: (data) => createUser(data),
  });
};

export const UpdateUserMutaion = () => {
  return useMutation({
    mutationKey: ["updateuse"],
    mutationFn: ({ id, data }) => updateUser(id, data),
  });
};
export const DeleteUserMutation = () => {
  return useMutation({
    mutationKey: ["deleteuser"],
    mutationFn: (id) => deleteUser(id),
  });
};
