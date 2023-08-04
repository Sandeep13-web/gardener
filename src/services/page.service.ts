import axiosInstance from "@/axios/axiosInstance";

export const getPageData = async (slug: any) => {
  try {
    const response = await axiosInstance.get(`/pages/${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getFaqData = async () => {
  try {
    const response = await axiosInstance.get("/faq");
    return response.data;
  } catch (error) {
    throw error;
  }
};
