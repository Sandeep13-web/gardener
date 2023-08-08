import axiosInstance from "@/axios/axiosInstance";

export const getOffers = async (
  query: any,
  page: any,
  offer: any,
  sortBy: string
) => {
  try {
    const response = await axiosInstance.get(`/v1/products`, {
      params: {
        query,
        page,
        offer,
        sortBy,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
