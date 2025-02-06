import { useMutation } from "@tanstack/react-query";
import { newPayment, verifyPayment } from "./paymentApi";

export const VerifyPaymentMutaion = () => {
  return useMutation({
    mutationKey: ["verifypayment"],
    mutationFn: (session) => verifyPayment(session),
  });
};
export const CreateNewPayment = () => {
  return useMutation({
    mutationKey: ["newpyament"],
    mutationFn: (data) => newPayment(data),
  });
};
