import { useMutation } from "@tanstack/react-query";
import {
  deleteVariant,
  multipleNewVariant,
  newVariant,
  updateVarint,
  uploadImages,
} from "./variant";

export const CreateVariantMutation = () => {
  return useMutation({
    mutationKey: ["createvariant"],
    mutationFn: (data) => newVariant(data),
  });
};
export const CreateMutipleVariant = () => {
  return useMutation({
    mutationKey: ["createmanyvariant"],
    mutationFn: (data) => multipleNewVariant(data),
  });
};
export const UploadImagesMutaion = () => {
  return useMutation({
    mutationKey: ["uploadimages"],
    mutationFn: (data) => uploadImages(data),
  });
};
export const UpdateVariantMutation = () => {
  return useMutation({
    mutationKey: ["updatevariant"],
    mutationFn: (data) => updateVarint(data),
  });
};
export const DeleteVariantMutaion = () => {
  return useMutation({
    mutationKey: ["deletevariant"],
    mutationFn: (variantId) => deleteVariant(variantId),
  });
};
