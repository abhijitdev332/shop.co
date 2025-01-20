import { PrivateAxios } from "../services/api/api";

const getRecentReview = async () => {
  return await PrivateAxios.get("/products");
};

export { getRecentReview };
