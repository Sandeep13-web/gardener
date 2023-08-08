import axiosInstance from "@/axios/axiosInstance";
import { addWareHouseToStorage } from "@/shared/utils/cookies-utils/cookies.utils";

export const getCategoriesList = async () => {
  try {
    const response = await axiosInstance.get(`/v1/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomeData = async () => {
  try {
    const response = await axiosInstance.get(`/v1/web-home`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConfig = async () => {
  try {
    const response = await axiosInstance.get(`/v1/configs`);
    addWareHouseToStorage(response?.data?.data?.warehouses);
    return response.data;
  } catch (error) {
    throw error;
  }
};
