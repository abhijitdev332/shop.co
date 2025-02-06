import { useMutation } from "@tanstack/react-query";
import { deleteVariant, updateVarint } from "./variant";

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
