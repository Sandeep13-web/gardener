import axiosInstance from "@/axios/axiosInstance";

export const getProductsFromSlug = async (productSlug:any) => {
  try {
    const response = await axiosInstance.get(`/product/${productSlug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRelatedProductsFromId = async (productId:any) => {
  try {
    const response = await axiosInstance.get(`/product/${productId}/related`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProductByCategoryId = async (query:any, page:any,categoryId:any) => {
  try {
    const response = await axiosInstance.get(`product?query=${query}&page=${page}&categoryId=${categoryId}&allProduct=1`);
    return response.data;
  } catch (error) {
    throw error;
  }
};