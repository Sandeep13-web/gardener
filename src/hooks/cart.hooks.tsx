import { deleteCartItemById } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export const useCarts = () => {
    const queryClient = useQueryClient();
    const cartDelete = useMutation({
        mutationFn: deleteCartItemById,
        onSuccess: () => {
            queryClient.invalidateQueries(['getCart'])
        }
    })
    const handleRemoveFromCart = (id: number) => {
        cartDelete.mutate(id)
    };

    return { handleRemoveFromCart, cartDelete };
};