import { PrivateAxios } from "../../services/api/api";

const verifySession = async () => {
  let { data } = await PrivateAxios.post("/auth/verify-session");
  return data?.data;
};




export {verifySession}