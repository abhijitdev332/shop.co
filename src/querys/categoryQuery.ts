import { PrivateAxios } from "../services/api/api";

const getAllCategory = async () => {
  return PrivateAxios.get("/category");
};
const getSubsCategory = async () => {
  return PrivateAxios.get("/subCategory");
};

export { getAllCategory, getSubsCategory };
