import { config } from "../../config";
import axios from "axios";

const baseURL = config.gateway.baseUrl;
export const getProducts = async () => {
  try {
    const response = await axios.get(`${baseURL}/category`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
