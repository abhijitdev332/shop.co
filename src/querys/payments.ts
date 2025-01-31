import { PrivateAxios } from "../services/api/api";

const verifyPayment = async (session = "") => {
  return await PrivateAxios.post("/payment/verify-payment", {
    sessionId: session,
  });
};
const newPayment = async (data) => {
  return await PrivateAxios.post("/payment/checkout", data);
};

export { verifyPayment, newPayment };
