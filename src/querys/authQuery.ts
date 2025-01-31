import { PrivateAxios } from "../services/api/api";

const login = async (data) => {
  return PrivateAxios.post("/auth/login", data);
};
const logout = async (data) => {
  return PrivateAxios.post("/auth/logout", data);
};
const refreshToken = async (data) => {
  return PrivateAxios.post("/auth/refresh-token", data);
};
const register = async (data) => {
  return PrivateAxios.post("/user/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { login, logout, refreshToken, register };
