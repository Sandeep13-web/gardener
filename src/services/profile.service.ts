import axiosInstance from "@/axios/axiosInstance";

export const getProfile = async() => {
    try {
        const response = await axiosInstance.get('/profile')
        return response.data
    } catch (error) {
        throw error
    }
}
