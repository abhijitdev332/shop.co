import { PrivateAxios } from "../../services/api/api";

const newVariant = async (variantData: []) => {
  let { data } = await PrivateAxios.post(
    "/product/variant/create",
    variantData
  );
  return data?.data;
};
const uploadImages = async (variantImages: FileList | null) => {
  return await PrivateAxios.post(
    "/product/variant/uploadImages",
    variantImages,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
const multipleNewVariant = async (variantData: []) => {
  return await PrivateAxios.post("/product/variant/insert", {
    variantsArr: variantData,
  });
};
export const deleteVariant = async (variantid: string) => {
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
