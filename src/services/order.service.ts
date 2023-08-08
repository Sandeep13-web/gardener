import axiosInstance from "@/axios/axiosInstance";

export const getOrders = async (page: number, perPage: number) => {
  try {
    const response = await axiosInstance.get("/v1/orders", {
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

export const getOrderDetails = async (orderId: number) => {
  try {
    const response = await axiosInstance.get(`/v1/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
