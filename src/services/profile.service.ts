import axiosInstance from "@/axios/axiosInstance";
import { config } from "../../config";

const baseURL = config.gateway.baseUrl;

export const getProfile = async() => {
    try {
        const response = await axiosInstance.get(`${baseURL}/profile`)
        return response.data
    } catch (error) {
        throw error
    }
}
