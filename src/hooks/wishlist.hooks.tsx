import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToWishlist, removeProductFromWishlist, getAllWishlistProducts } from "@/services/wishlist.service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useState } from "react";


export const useWishlists = () => {
    const [favouriteList, setFavouriteList] = useState<any>([]);
    // const queryClient = useQueryClient();

    const addFavMutation = useMutation({
        mutationFn: addProductToWishlist,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Added To Favourite Successfully');
            allFavProdMutation.mutate();
        }
    })

    const handleAddToFav = (id: number) => {
        addFavMutation.mutate(id);
    }

    const removeFavMutation = useMutation({
        mutationFn: removeProductFromWishlist,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Removed From Favourite Successfully');
            allFavProdMutation.mutate();
        }
    })

    const handleRemoveFromFav = (id: number) => {
        removeFavMutation.mutate(id);
    }

    const allFavProdMutation = useMutation({
        mutationFn: getAllWishlistProducts,
        onSuccess: (response) => {
            // const favProductId: Array<any> = [];
            // response.data.forEach((product: any) => {
            //     favProductId.push(product.product_id)
            // })
            setFavouriteList(response);
        }
    })

    return {
        handleAddToFav,
        handleRemoveFromFav,
        favouriteList,
        addFavMutation,
        removeFavMutation,
        addLoading: addFavMutation.isLoading,
        removeLoading: removeFavMutation.isLoading
    }
}