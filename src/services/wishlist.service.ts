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

export const getAllWishlistProducts = async () => {
    try {
        const response = await axiosInstance.get('/favourite/products');
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addProductToWishlist = async (id: number) => {
    try {
        const produtId = {
            id: id,
        }
        const response = await axiosInstance.post('/favourite', produtId);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const removeProductFromWishlist = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`/favourite/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}