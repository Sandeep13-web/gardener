import axiosInstance from "@/axios/axiosInstance";
import { addWareHouseToStorage } from "@/shared/utils/cookies-utils/cookies.utils";

export const getCategoriesList = async () => {
  try {
    const response = await axiosInstance.get(`/categories`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomeData = async () => {
  try {
    const response = await axiosInstance.get(`/web-home`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConfig = async () => {
  try {
    const response = await axiosInstance.get(`/config`);
    addWareHouseToStorage(response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
