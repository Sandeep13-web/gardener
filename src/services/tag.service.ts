import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndPoint1 = config.gateway.apiEndPoint1;

export const getTagList = async () => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/tag`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductByTagId = async (
  query: any,
  page: any,
  tagId: any,
  maxPrice: any,
  minPrice: any
) => {
  try {
    const response = await axiosInstance.get(`/${apiEndPoint1}/product`, {
      params: {
        query,
        page,
        tagId,
        maxPrice,
        minPrice,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
