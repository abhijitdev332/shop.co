import { PrivateAxios } from "../services/api/api";

const getOrderDeatils = async (id) => {
  return PrivateAxios.get(`/order/${id}`);
};
const getSubsCategory = async () => {
  return PrivateAxios.get("/subcategory");
};

export { getOrderDeatils, getSubsCategory };
