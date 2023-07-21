import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToWishlist, removeProductFromWishlist } from "@/services/wishlist.service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useState } from "react";

export const useWishlists = () => {
    const queryClient = useQueryClient();

    const addFavMutation = useMutation({
        mutationFn: addProductToWishlist,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Added To Favourite Successfully');
            queryClient.invalidateQueries(['wishlistProducts'])
        }
    })

    const removeFavMutation = useMutation({
        mutationFn: removeProductFromWishlist,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Removed From Favourite Successfully');
            queryClient.invalidateQueries(['wishlistProducts'])
            queryClient.invalidateQueries(['getWishlists'])
        }
    })



    return {
        addFavMutation,
        removeFavMutation,
        addLoading: addFavMutation.isLoading,
        removeLoading: removeFavMutation.isLoading
    }
}