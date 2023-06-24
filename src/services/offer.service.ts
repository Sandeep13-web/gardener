import axiosInstance from "@/axios/axiosInstance";

export const getOffers = async (
  query: any,
  page: any,
  offer: any,
  maxPrice: any,
  minPrice: any
) => {
  try {
    const response = await axiosInstance.get(`/product`, {
      params: {
        query,
        page,
        offer,
        maxPrice,
        minPrice,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
