import axiosInstance from "@/axios/axiosInstance";
import { setCookie } from "cookies-next";

export const getCartData = async () => {
  try {
    const response = await axiosInstance.get(`/cart`);
    if (response.status === 200) {
      setCookie("cartNumber", response?.data?.data?.cartNumber);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItemById = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`/cart-product/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (data: any) => {
  try {
    const response = await axiosInstance.post("/cart-product", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
