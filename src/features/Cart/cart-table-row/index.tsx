import { useCarts } from '@/hooks/cart.hooks';
import { useDebounce } from '@/hooks/useDebounce.hooks';
import { IUpdateCartItem } from '@/interface/cart.interface';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';

const CartTableRow = ({ item }: any) => {
    const [quantity, setQuantity] = useState<number>(item?.quantity || 1);
    const stock: any = item?.selectedUnit?.stock

    const { updateCartMutation, handleRemoveFromCart } = useCarts(); //customHook

    /*
  ** Provides payload to the update api when the value is being increased or decreased.
  */
    const handleUpdateCart = (newQuantity: number, itemId: number) => {
        if (newQuantity <= stock) {
            const payload: IUpdateCartItem = {
                note: '',
                quantity: newQuantity,
                product_number: itemId,
            }
            updateCartMutation.mutate(payload)
        }
    };

    /**
     * Used in order to debounce the value(quantity) that is being updated.
     */
    const debouncedHandleUpdateCart = useCallback( //debounce callback to call when value changes
        debounce((newQuantity) => {
            handleUpdateCart(newQuantity, item?.id!)
        }, 300), [item]
    )

    /**
     * For btn onClick function to pass the new value either being increased or decreased.
     */
    const updateCartCall = (newQuantity: number) => {
        setQuantity(newQuantity) //set the updated value
        debouncedHandleUpdateCart(newQuantity) //debounce callback added the updated value
    }

    // useEffect(() => {
    //     handleUpdateCart(debounceSearchValue);
    // }, [debounceSearchValue])
    const selectedUnit = item?.selectedUnit
    const selectedImg = item?.product?.images.find((img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id));

    return (
        <tr className="border-b-gray-350">
            <td className="w-[150px] text-gray-650 text-center py-[30px] font-medium">
                <Image
                    src={selectedImg?.imageName}
                    height={80}
                    width={80}
                    alt={item?.product?.title}
                />
            </td>
            <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium">
                <Link href={`/products/${item?.product?.slug}`} className="text-[15px]" aria-label="indoor-plants" >
                    {item?.product?.title}{" "}
                    <span className="capitalize text-orange-4500">({item?.selectedUnit?.size})</span>
                </Link>
            </td>
            <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium text-[15px]">
                NPR {item?.selectedUnit?.sellingPrice}
            </td>
            <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium">
                <div className="flex justify-center m-auto h-[40px] max-w-[115px]">
                    <button
                        className="text-base text-gray-650 p-[5px] border border-gray-350 transition-all delay-100 duration-150 hover:bg-slate-850 hover:text-primary disabled:cursor-not-allowed disabled:hover:opacity-50 disabled:pointer-events-none"
                        onClick={() => { updateCartCall(quantity - 1) }}
                        disabled={quantity === 1 ? true : false}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        className="w-full text-base text-center border-y border-y-gray-350 focus:outline-0"
                        readOnly
                        value={quantity}
                        maxLength={3}
                    />
                    <button
                        className="text-base text-gray-650 p-[5px] border border-gray-350 transition-all delay-100 duration-150 hover:bg-slate-850 hover:text-primary disabled:cursor-not-allowed disabled:hover:opacity-50 disabled:pointer-events-none"
                        onClick={() => { updateCartCall(quantity + 1) }}
                        disabled={quantity === stock ? true : false}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="text-gray-650 text-center py-[30px] font-medium text-[15px]">
                NPR {item?.selectedUnit?.sellingPrice * item?.quantity}
            </td>
            <td className="w-[100px] text-center py-[30px]">
                <button
                    className="border border-gray-350 flex items-center justify-center m-auto transition-all delay-100 duration-150 w-[40px] h-[36px] hover:bg-slate-850 hover:text-primary"
                    onClick={() => handleRemoveFromCart(item?.id)}
                >
                    <FaTimes className="w-[15px]" />
                </button>
            </td>
        </tr>
    )
}

export default CartTableRow