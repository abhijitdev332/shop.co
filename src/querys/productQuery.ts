import { PrivateAxios } from "../services/api/api";

const newArivals = async () => {
  return await PrivateAxios.get("/product/arival");
};
const topSelling = async () => {
  return await PrivateAxios.get("/product/top");
};
const getProduct = async (id: string) => {
  return await PrivateAxios.get(`/product/${id}`);
};
const getAllproducts = async () => {
  return await PrivateAxios.get("/admin/products");
};
let getProductByCategory = async (query) => {
  switch (query) {
    case "male":
      return await PrivateAxios.get(`/product?gender=${query}`);

    case "female":
      return await PrivateAxios.get(`/product?gender=${query}`);

    case "sale":
      return await PrivateAxios.get(`/product/sale`);

    case "new arrivel":
      return await PrivateAxios.get(`/product/arival`);

    default:
      return await PrivateAxios.get(`/category/${query}`);
  }
};

export {
  newArivals,
  topSelling,
  getProduct,
  getAllproducts,
  getProductByCategory,
};
