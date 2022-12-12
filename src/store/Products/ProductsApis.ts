import { productsInstance } from "../../network/apis";
const handlerEnabled = false;

const getProductsRequest = async () => {
  return await productsInstance.get(""); // task 3 related
};

const getProductByIdRequest = async (id) => {
  return await productsInstance.get(`/${id}`); // get producy by id lambda call
};

const addProductRequest = async () => {
  return await productsInstance.post(`/add`, { handlerEnabled });
};

const deleteProductRequest = async () => {
  return await productsInstance.delete(`/delete`);
};

export default {
  getProductsRequest,
  getProductByIdRequest,
  addProductRequest,
  deleteProductRequest,
};
