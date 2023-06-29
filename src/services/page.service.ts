import axiosInstance from "@/axios/axiosInstance";

export const getPageData = async (slug: any) => {
  try {
    const response = await axiosInstance.get(`/page/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
