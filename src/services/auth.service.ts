import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";
import { IChangePassword, IForgotPassword, IResetPassword } from "@/interface/password.interface";

export const signUp = async (data: any) => {
  try {
    const response = await axiosInstance.post(`/auth/signup`, data);

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
    const response = await axiosInstance.post(`/auth/login`, {
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

export const logout = async() => {
  try{
    const response = await axiosInstance.get('/auth/logout')
    if(response.status === 204){
      return response
    }
  } catch(error){
    throw error
  }
}

export const forgotPassword = async (email: IForgotPassword) => {
  try {
    const response = await axiosInstance.post('/auth/forgot-password', email);
    return response;
  } catch (error) {
    throw error;
  }
}

export const resetPassword = async (resetPasswordBody: IResetPassword) => {
  try {
    const response = await axiosInstance.post('/auth/reset-password', resetPasswordBody);
    return response;
  } catch (error) {
    throw error;
  }
}

export const changePassword = async (changePasswordBody: IChangePassword) => {
  try {
    const response = await axiosInstance.post('/profile/change-password', changePasswordBody);
    return response;
  } catch (error) {
    throw error;
  }
}