import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";
import axios from "axios";

const baseURL = config.gateway.baseUrl;

export const getOffers = async (query:any, page:any, offer:any, maxPrice:any, minPrice:any) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/product`, {
      params: {
        query,
        page,
        offer,
        maxPrice,
        minPrice
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};



