import { axiosInstance } from "../../network/apis";
const handlerEnabled = false;

const addProductRequest = async () => {
  return await axiosInstance.post(`/add`, { handlerEnabled });
};

const deleteProductRequest = async () => {
  return await axiosInstance.delete(`/delete`);
};

export default {
  addProductRequest,
  deleteProductRequest,
};
