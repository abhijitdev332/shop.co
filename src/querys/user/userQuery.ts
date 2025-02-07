import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  updateUserRole,
} from "./userApi";

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
    mutationKey: ["updateuser"],
    mutationFn: ({ id, data }) => updateUser(id, data),
  });
};
export const UpdateUserRoleMutaion = () => {
  return useMutation({
    mutationKey: ["updateuserrole"],
    mutationFn: ({ id, data }) => updateUserRole(id, data),
  });
};
export const DeleteUserMutation = () => {
  return useMutation({
    mutationKey: ["deleteuser"],
    mutationFn: (id) => deleteUser(id),
  });
};
