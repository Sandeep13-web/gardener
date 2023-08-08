import axiosInstance from "@/axios/axiosInstance";
import { IBlogItem } from "@/interface/blog.interface";

export const getBlogs = async (
    page?: number,
    perPage?: number,
    featured?: number,
) => {
    try {
        let params = {}
        if (page && perPage) {
            params = {
                ...params,
                page,
                perPage,
            }
        }
        if (featured) {
            params = {
                ...params,
                featured,
            }
        }
        const response = await axiosInstance.get(`/v1/blog`, {
            params: params,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getBlogDetailsFromSlug = async ( slug: string | string[] ) => {
    try {
        const response = await axiosInstance.get(`/v1/blog/${slug}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}