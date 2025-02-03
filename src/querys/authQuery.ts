import { useMutation, useQuery } from "@tanstack/react-query";
import { PrivateAxios } from "../services/api/api";
import { logout, verifySession } from "./auth/authApi";

const useVerifySession = () => {
  return useQuery({
    queryKey: ["getusersession"],
    queryFn: verifySession,
    retry: false,
  });
};
const login = async (data) => {
  return PrivateAxios.post("/auth/login", data);
};
export const LogoutMutaion = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
const refreshToken = async () => {
  return await PrivateAxios.post("/auth/refresh-token");
};
const register = async (data) => {
  return PrivateAxios.post("/user/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { useVerifySession, login, logout, refreshToken, register };
