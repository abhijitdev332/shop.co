import { PrivateAxios } from "../services/api/api";

const newVariant = async (variantData) => {
  return PrivateAxios.post("/product/variant/create", variantData);
};

export { newVariant };
