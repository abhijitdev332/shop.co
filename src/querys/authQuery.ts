import { useQuery } from "@tanstack/react-query";
import { AxiosInt, PrivateAxios } from "../services/api/api";
import { verifySession } from "./auth/authApi";

const useVerifySession=()=>{
  return useQuery({
    queryKey: ["getusersession"],
    queryFn: verifySession,
    retry:false
    
  });

}
const login = async (data) => {
  return PrivateAxios.post("/auth/login", data);
};
const logout = async (data) => {
  return PrivateAxios.post("/auth/logout", data);
};
const refreshToken = async () => {
  return await PrivateAxios.post("/auth/refresh-token", );
};
const register = async (data) => {
  return PrivateAxios.post("/user/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { useVerifySession, login, logout, refreshToken, register };
