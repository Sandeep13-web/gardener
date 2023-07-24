import { bulkDeleteCart, deleteCartItemById, updateCart } from "@/services/cart.service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export const useCarts = () => {
    const [selectedId, setSelectedId] = useState<number>(0);
    const queryClient = useQueryClient();
    const router = useRouter()

    const cartDelete = useMutation({
        mutationFn: deleteCartItemById,
        onSuccess: () => {
            queryClient.invalidateQueries(['getCart'])
            showToast(TOAST_TYPES.success, 'Item Deleted From Cart Successfully');
            if (router.pathname === '/wishlist') {
                queryClient.invalidateQueries(['wishlistProducts'])
            }
        }
    })

    const handleRemoveFromCart = (id: number) => {
        setSelectedId(id)
        cartDelete.mutate(id)
    };

    const updateCartMutation = useMutation({
        mutationFn: updateCart,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Updated To Cart Successfully');
            queryClient.invalidateQueries(['getCart'])
        }
    })

    const bulkCartDelete = useMutation({
        mutationFn: bulkDeleteCart,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Deleted From Cart Successfully');
            deleteCookie('cart_number')
            queryClient.invalidateQueries(['getCart'])
        }
    })


    return {
        handleRemoveFromCart,
        cartDelete,
        selectedId,
        updateCartMutation,
        bulkCartDelete,
        bulkDeleteLoading: bulkCartDelete.isLoading,
        updateCartLoading: updateCartMutation.isLoading,
        cartDeleteLoading: cartDelete.isLoading
    };
};