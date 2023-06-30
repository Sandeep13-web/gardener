import { deleteCartItemById, updateCart } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCarts = () => {
    const [selectedId, setSelectedId] = useState<number>(0);
    const queryClient = useQueryClient();

    const cartDelete = useMutation({
        mutationFn: deleteCartItemById,
        onSuccess: () => {
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
            queryClient.invalidateQueries(['getCart'])
        }
    })


    return { handleRemoveFromCart, cartDelete, selectedId, updateCartMutation };
};