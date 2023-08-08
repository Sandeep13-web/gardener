import axiosInstance, {
  setAuthorizationHeader,
  setCouponHeader,
} from "@/axios/axiosInstance";
import { config } from "../../config";
import {
  IChangePassword,
  IForgotPassword,
  IResetPassword,
} from "@/interface/password.interface";
import axios from "axios";
import { getCartNumber } from "@/shared/utils/cookies-utils/cookies.utils";
const apiURL = config.gateway.apiURL;

export const signUp = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/v1/register`, data);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  const grantType = "password";
  try {
    const response = await axiosInstance.post(`/v1/login`, {
      ...data,
      grantType,
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/v1/logout");
    if (response.status === 204) {
      setCouponHeader({
        coupon: "",
      });
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (account: IForgotPassword) => {
  try {
    const response = await axiosInstance.post("/v1/forget-password", account);
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (resetPasswordBody: IResetPassword) => {
  try {
    const response = await axiosInstance.post(
      "/v1/reset-password",
      resetPasswordBody
    );
    return response?.data?.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (changePasswordBody: IChangePassword) => {
  try {
    const response = await axiosInstance.post(
      "/v1/change-password",
      changePasswordBody
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.post("/v1/user/delete", {
      reason: "",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerGuestUser = async (data: any, isInitialSubmit: any) => {
  const registerGuestUserUrl = `${apiURL}/v1/guest/register`;
  let payload;
  if (isInitialSubmit) {
    payload = {
      password_confirmation: data.confirm_password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      password: data.password,
    };
  } else {
    payload = {
      password_confirmation: data.confirm_password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      password: data.password,
    };
  }

  try {
    const response = await axios.post(`/v1/${registerGuestUserUrl}`, payload, {
      headers: {
        "Cart-Number": getCartNumber(),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
