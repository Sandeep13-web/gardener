import axiosInstance, { setAuthorizationHeader } from "@/axios/axiosInstance";
import { IProfileImage, IProfileSubmit } from "@/interface/profile.interface";
import { getToken, getWareId } from "@/shared/utils/cookies-utils/cookies.utils";
import axios from "axios";
import { config } from "../../config";
const apiURL = config.gateway.apiURL;

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


export const uploadProfileImage = async (image: File) => {
  const imageUrl = `${apiURL}/profile/image`;

  const headers = {
    ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    "Api-Key": config.gateway.apiKey,
    "Warehouse-Id": getWareId(),
  };

  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(imageUrl, formData, {
      headers: headers,
    });
  } catch (error) {
    console.error(error);
  }
};
