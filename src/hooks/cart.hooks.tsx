import { bulkDeleteCart, deleteCartItemById, updateCart } from "@/services/cart.service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useCarts = () => {
    const [selectedId, setSelectedId] = useState<number>(0);
    const queryClient = useQueryClient();

    const cartDelete = useMutation({
        mutationFn: deleteCartItemById,
        onSuccess: () => {
            showToast(TOAST_TYPES.success, 'Item Deleted From Cart Successfully');
            queryClient.invalidateQueries(['getCart'])
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
        updateCartLoading: updateCartMutation.isLoading
    };
};