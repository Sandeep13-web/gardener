import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";
import {
  IChangePassword,
  IForgotPassword,
  IResetPassword,
} from "@/interface/password.interface";
import axios from "axios";
import { getCartNumber } from "@/shared/utils/cookies-utils/cookies.utils";
const baseURL = config.gateway.baseURL;

export const signUp = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/signup`, data);

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  const grant_type = "password";
  const client_secret: any = process.env.NEXT_PUBLIC_CLIENT_SECRET;
  const client_id: any = process.env.NEXT_PUBLIC_CLIENT_ID;
  const provider = "";
  const refresh_token = "";
  try {
    const response = await axiosInstance.post(`/login`, {
      ...data,
      grant_type,
      client_secret,
      client_id,
      provider,
      refresh_token,
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
    const response = await axiosInstance.get("/auth/logout");
    if (response.status === 204) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: IForgotPassword) => {
  try {
    const response = await axiosInstance.post("/auth/forgot-password", email);
    return response;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (resetPasswordBody: IResetPassword) => {
  try {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      resetPasswordBody
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (changePasswordBody: IChangePassword) => {
  try {
    const response = await axiosInstance.post(
      "/profile/change-password",
      changePasswordBody
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axiosInstance.post("/request-account-delete");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerGuestUser = async (data: any, isInitialSubmit: any) => {
  const registerGuestUserUrl = `${baseURL}/guest/signup`;
  let payload;
  if (isInitialSubmit) {
    payload = {
      check: 1,
      confirmPassword: data.confirm_password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      password: data.password,
    };
  } else {
    payload = {
      confirmPassword: data.confirm_password,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      mobile_number: data.mobile_number,
      password: data.password,
      cartNumber: getCartNumber(),
      contact_no: data.contact_no,
      customer: data.customer,
      delivery_title: data.title,
      latitude: data.latitude,
      longitude: data.longitude,
    };
  }

  try {
    const response = await axios.post(`${registerGuestUserUrl}`, payload, {
      headers: {
        "Cart-Number": getCartNumber(),
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
