import axiosInstance, { setAuthorizationHeader } from "@/axios/axiosInstance";
import { IProfileSubmit } from "@/interface/profile.interface";

export const getProfile = async () => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProfileShow = async () => {
  try {
    const response = await axiosInstance.get("/profile/show");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data: IProfileSubmit) => {
  try {
    const response = await axiosInstance.patch("/profile", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
