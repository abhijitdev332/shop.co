import axios, { AxiosInstance } from "axios";

const AxiosInt: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
const PrivateAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: "https://ecommerce-backend-bqo3.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});
const AdminAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_ADMIN_URL,
  // baseURL: "https://ecommerce-backend-bqo3.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

PrivateAxios.defaults.withCredentials = true;
AdminAxios.defaults.withCredentials = true;
export { AxiosInt, PrivateAxios, AdminAxios };
