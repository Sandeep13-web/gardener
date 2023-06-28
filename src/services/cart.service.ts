import axiosInstance from "@/axios/axiosInstance";
import { ICreateCartItem } from "@/interface/cart.interface";
import { setCookie } from "cookies-next";

export const setCartNumberCookie = async () => {
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
export const getCartData = async ({ cartId }: { cartId: string }) => {
  try {
    const response = await axiosInstance.get(`/cart`, {
      headers: {
        "Cart-Number": cartId,
      },
    });
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
  const payload = {
    ...data,
  };
  delete payload.cart_id;
  try {
    const response = await axiosInstance.post(
      `/cart-product/${data.cart_id}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
