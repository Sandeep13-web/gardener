import axiosInstance from "@/axios/axiosInstance";

export const getWishlists = async (
    page: number,
    perPage: number,
) => {
    try {
        const response = await axiosInstance.get('/favourite', {
            params: {
                page,
                perPage,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
