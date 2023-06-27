import axiosInstance from "@/axios/axiosInstance";

export const getSearchResults = async (
  type?: string,
  query?: string,
  page?: number
) => {
  try {
    let apiUrl = "";

    if (type === "category") {
      apiUrl = "/category";
    } else if (type === "product") {
      apiUrl = "/product";
    } else {
      throw new Error("Invalid search type");
    }

    const response = await axiosInstance.get(apiUrl, {
      params: {
        query,
        page,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};