import { PrivateAxios } from "../../services/api/api";

export const verifyPayment = async (session = "") => {
  return await PrivateAxios.post("/payment/verify-payment", {
    sessionId: session,
  });
};
export const newPayment = async (body) => {
  let { data } = await PrivateAxios.post("/payment/checkout", body);
  return data?.data;
};
