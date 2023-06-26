import axiosInstance from "@/axios/axiosInstance";

export const getProductsFromSlug = async (productSlug:any) => {
  try {
    const response = await axiosInstance.get(`/product/${productSlug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};