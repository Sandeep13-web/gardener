import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";
import axios from "axios";

const baseURL = config.gateway.baseUrl;

export const getProductCategory = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomeData = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/home`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConfig = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/config`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
