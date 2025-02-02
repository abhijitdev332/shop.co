import axios, { AxiosInstance } from "axios";
import { refreshToken } from "../../querys/authQuery";


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
PrivateAxios.interceptors.response.use((res)=>res,async(error)=>{
  const originalRequest=error?.config
  if(error.response?.status==401&&!originalRequest?._retry){
    originalRequest._retry=true

    try {
      const refreshRes=await refreshToken()
      if(refreshRes.status==200){
        return originalRequest
      }

      
    } catch (err) {
      return Promise.reject(err)
    }
  }
})
AdminAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config;
    if (error.response?.status == 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await refreshToken();
        if (refreshRes.status == 200) {
          return originalRequest;
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
);




PrivateAxios.defaults.withCredentials = true;
AdminAxios.defaults.withCredentials = true;
export { AxiosInt, PrivateAxios, AdminAxios };
