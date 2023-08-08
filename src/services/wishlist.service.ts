import axiosInstance, { setAuthorizationHeader } from "@/axios/axiosInstance";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";

export const getWishlists = async (page: number, perPage: number) => {
  try {
    const response = await axiosInstance.get("/v1/favourite/product", {
      params: {
        page,
        perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllWishlistProducts = async (token: any) => {
  setAuthorizationHeader();
  if (token) {
    try {
      const response = await axiosInstance.get("/v1/favourite/product/list");
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export const updateProductInWishlist = async (id: number) => {
  try {
    const produtId = {
      id: id,
    };
    const response = await axiosInstance.post("/v1/favourite/product", produtId);
    return response.data;
  } catch (error) {
    throw error;
  }
};
