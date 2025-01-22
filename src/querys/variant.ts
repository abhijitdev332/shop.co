import { PrivateAxios } from "../services/api/api";

const newVariant = async (variantData) => {
  return PrivateAxios.post("/product/variant/create", variantData);
};
const uploadImages = async (variantImages) => {
  return PrivateAxios.post("/product/variant/uploadImages", variantImages, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const multipleNewVariant = async (variantData) => {
  return PrivateAxios.post("/product/variant/insert", {
    variantsArr: variantData,
  });
};

export { newVariant, uploadImages, multipleNewVariant };
