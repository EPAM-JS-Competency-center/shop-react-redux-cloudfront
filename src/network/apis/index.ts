import axios from "axios";
import { requestHandler, successHandler, errorHandler } from "../interceptors";
import { BASE_URL, API_PATHS } from "../../constants/apiPaths";

export const productsInstance = axios.create({
  baseURL: API_PATHS.product,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${localStorage.getItem("authorization_token")}`,
  },
});

// Handle request process
axiosInstance.interceptors.request.use((request) => requestHandler(request));
// Handle response process
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);
