import axiosInstance from "@/axios/axiosInstance";
import { IContactUs } from "@/interface/contact-us.interface";

export const sendFeedback = async (payload: IContactUs) => {
  try {
    const response = await axiosInstance.post("/contact-us", payload);
    return response;
  } catch (error) {
    throw error;
  }
};

export const feedBackOption = async () => {
  try {
    const response = await axiosInstance.get("/feedback-section");
    return response?.data;
  } catch (error) {
    throw error;
  }
};
