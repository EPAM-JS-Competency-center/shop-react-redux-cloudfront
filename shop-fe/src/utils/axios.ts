import axios from "axios";
import { errorBus } from "~/utils/errorBus";

axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    const token = localStorage.getItem("authorization_token");
    const isAWSAuth = config?.url?.match(/.*X-Amz-Algorithm.*/);

    if (token && !isAWSAuth) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401 || error?.response?.status === 403) {
      errorBus.setError(error);
    }
    return Promise.reject(error);
  },
);
