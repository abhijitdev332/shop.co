import { PrivateAxios } from "../services/api/api";

const newArivals = async () => {
  return await PrivateAxios.get("/products/arrivals");
};
const topSelling = async () => {
  return await PrivateAxios.get("/products/top");
};

export { newArivals, topSelling };
