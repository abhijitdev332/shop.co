import { PrivateAxios } from "../../services/api/api";

export const verifySession = async () => {
  let { data } = await PrivateAxios.post("/auth/verify-session");
  return data?.data;
};
export const login = async (body) => {
  let { data } = await PrivateAxios.post("/auth/login", body);
  return data?.data;
};
export const logout = async (body) => {
  let { data } = await PrivateAxios.post("/auth/logout", body);
  return data;
};
