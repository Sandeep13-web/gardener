import axios from "axios";
// import { clearLocalStorage } from "../utils/localStorage.util";
import { config } from "../../config";

const baseURL = config.gateway.baseUrl;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      // trying to catch cancelled state
      // error.response.status = 'cancelled';
      return Promise.reject(error);
    }
    //Handle refresh token here
    const originalRequest = error.config;
    if (
      error?.response?.status === 401 &&
      window?.location?.pathname !== "/login"
    ) {
      localStorage.setItem("logoutUser", "true");
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (error.response?.status === 306 && !originalRequest._retry) {
      originalRequest._retry = true;
      //do some stuff here........
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
