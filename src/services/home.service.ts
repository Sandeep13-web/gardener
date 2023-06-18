import { config } from "../../config";
import axios from "axios";

const baseURL = config.gateway.baseUrl;

export const getProductCategory = async () => {
  try {
    const response = await axios.get(`${baseURL}/category`, {
      headers: {
        "Api-Key": config.gateway.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getHomeData = async () => {
  try {
    const response = await axios.get(`${baseURL}/home`, {
      headers: {
        "Api-Key": config.gateway.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getConfig = async () => {
  try {
    const response = await axios.get(`${baseURL}/config`, {
      headers: {
        "Api-Key": config.gateway.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
