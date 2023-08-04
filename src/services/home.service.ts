import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";
import axios from "axios";
import { addWareHouseToStorage } from "@/shared/utils/cookies-utils/cookies.utils";

export const getProductCategory = async () => {
  try {
    const response = await axiosInstance.get(`/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomeData = async () => {
  try {
    const response = await axiosInstance.get(`/home`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConfig = async () => {
  try {
    const response = await axiosInstance.get(`/configs`);
    addWareHouseToStorage(response.data.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
