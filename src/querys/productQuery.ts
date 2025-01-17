import { PrivateAxios } from "../services/api/api";

const newArivals = async () => {
  return await PrivateAxios.get("/product/arival");
};
const topSelling = async () => {
  return await PrivateAxios.get("/product/top");
};

export { newArivals, topSelling };
