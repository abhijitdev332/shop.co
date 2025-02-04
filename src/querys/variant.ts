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

export const deleteVariant = async (variantid) => {
  let { data } = await PrivateAxios.delete(
    `/product/variant/remove/${variantid}`
  );
  return data;
};
export const updateVarint = async (body = "") => {
  let { data } = await PrivateAxios.put("/product/variant/update/many", body);
  return data;
};

export { newVariant, uploadImages, multipleNewVariant };
