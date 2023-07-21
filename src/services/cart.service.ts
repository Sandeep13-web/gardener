import axiosInstance, {
  setAuthorizationHeader,
  setCouponHeader,
} from "@/axios/axiosInstance";
import { ICreateCartItem, IUpdateCartItem } from "@/interface/cart.interface";
import { CookieKeys } from "@/shared/enum";
import {
  getCartNumber,
  getToken,
  getWareId,
} from "@/shared/utils/cookies-utils/cookies.utils";
import axios from "axios";
import { setCookie } from "cookies-next";
import { config } from "../../config";
const baseURL = config.gateway.baseURL;

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
    setCouponHeader();
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
  delete payload.product_number;
  try {
    const response = await axiosInstance.patch(
      `/cart-product/${data.product_number}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const bulkDeleteCart = async () => {
  try {
    const response = await axiosInstance.delete("/cart");
    return response;
  } catch (error) {
    throw error;
  }
};

// export const associateCart = async () => {
//   try {
//     const response = await axiosInstance.get(`/cart/associate`);
//     return response.data.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const associateCart = async (auth: any) => {
  const associateCartUrl = `${baseURL}/cart/associate`;

  const headers = {
    ...(getCartNumber() && { "Cart-Number": getCartNumber() }),
    // ...(getCoupon() && { Coupon: getCoupon() }),

    Authorization: `Bearer ${auth}`,
    "Warehouse-Id": getWareId(),
  };

  try {
    const response = await axios.get(`${associateCartUrl}`, { headers });
    // Handle successful response
  } catch (error) {
    // Handle error
    console.error(error);
  }
};
