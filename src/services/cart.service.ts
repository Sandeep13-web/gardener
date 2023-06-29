import axiosInstance from "@/axios/axiosInstance";
import { ICreateCartItem, IUpdateCartItem } from "@/interface/cart.interface";
import { CookieKeys } from "@/shared/enum";
import { setCookie } from "cookies-next";

export const setCartNumberCookie = async () => {
  try {
    const response = await axiosInstance.get(`/cart`);
    if (response.status === 200) {
      setCookie(CookieKeys.CARTNUMBER, response?.data?.data?.cartNumber);
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getCartData = async () => {
  try {
    const response = await axiosInstance.get(`/cart`);
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

export const addToCart = async (data: ICreateCartItem) => {
  try {
    const response = await axiosInstance.post(`/cart-product`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCart = async (data: IUpdateCartItem) => {
  const payload = {
    ...data,
  };
  delete payload.cart_number;
  try {
    const response = await axiosInstance.post(
      `/cart-product/${payload.cart_number}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
