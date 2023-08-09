import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const apiEndpoint1 = config.gateway.apiEndPoint1;

export const getBlogs = async (
  page?: number,
  perPage?: number,
  featured?: number
) => {
  try {
    let params = {};
    if (page && perPage) {
      params = {
        ...params,
        page,
        perPage,
      };
    }
    if (featured) {
      params = {
        ...params,
        featured,
      };
    }
    const response = await axiosInstance.get(`/${apiEndpoint1}/blog`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogDetailsFromSlug = async (slug: string | string[]) => {
  try {
    const response = await axiosInstance.get(`/${apiEndpoint1}/blog/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
