import { productsInstance } from "../../network/apis";

const getProductsRequest = async () => {
  return await productsInstance.get("");
};

const getProductByIdRequest = async (id) => {
  return await productsInstance.get(`/${id}`);
};

const createProductRequest = async (body) => {
  return await productsInstance.post("", body);
};

const deleteProductRequest = async () => {
  return await productsInstance.delete(`/delete`);
};

export default {
  getProductsRequest,
  getProductByIdRequest,
  createProductRequest,
  deleteProductRequest,
};
