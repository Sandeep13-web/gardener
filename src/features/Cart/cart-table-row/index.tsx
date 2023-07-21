import { useCarts } from '@/hooks/cart.hooks';
import { useDebounce } from '@/hooks/useDebounce.hooks';
import { IUpdateCartItem } from '@/interface/cart.interface';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa';

const CartTableRow = ({ item }: any) => {
    const [value, setValue] = useState<number>(item?.quantity || 1);
    const stock: any = item?.selectedUnit?.stock
    const [productId, setProductId] = useState<number>();
    const debounceSearchValue: any = useDebounce(value, 300)

    const { updateCartMutation, handleRemoveFromCart } = useCarts(); //customHook

    const handleUpdateCart = (values: number) => {
        if (values <= stock) {
            const payload: IUpdateCartItem = {
                note: '',
                quantity: debounceSearchValue,
                product_number: productId,
            }
            updateCartMutation.mutate(payload)
        }

    };
    useEffect(() => {
        handleUpdateCart(debounceSearchValue);
    }, [debounceSearchValue])
    return (
        <tr className="border-b-gray-350">
            <td className="w-[150px] text-gray-650 text-center py-[30px] font-medium">
                <Image
                    src={"/images/card-img.jpeg"}
                    height={80}
                    width={80}
                    alt={item?.product?.title}
                />
            </td>
            <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium">
                <Link href={`/products/${item?.product?.slug}`} className="text-[15px]">
                    {item?.product?.title}{" "}
                    <span className="capitalize">(Indoor)</span>
                </Link>
            </td>
            <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium text-[15px]">
                NPR {item?.product?.unitPrice[0]?.sellingPrice}
            </td>
            <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium">
                <div className="flex justify-center m-auto h-[40px] max-w-[115px]">
                    <button
                        className="text-base text-gray-650 p-[5px] border border-gray-350 transition-all delay-100 duration-150 hover:bg-slate-850 hover:text-primary disabled:cursor-not-allowed disabled:hover:opacity-50"
                        onClick={() => { setValue(value - 1); setProductId(item?.id) }}
                        disabled={value === 1 ? true : false}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        className="w-full text-base text-center border-y border-y-gray-350 focus:outline-0"
                        readOnly
                        value={value}
                        maxLength={3}
                    />
                    <button
                        className="text-base text-gray-650 p-[5px] border border-gray-350 transition-all delay-100 duration-150 hover:bg-slate-850 hover:text-primary disabled:cursor-not-allowed disabled:hover:opacity-50"
                        onClick={() => { setValue(value + 1); setProductId(item?.id) }}
                        disabled={value === stock ? true : false}
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="text-gray-650 text-center py-[30px] font-medium text-[15px]">
                NPR {item?.product?.unitPrice[0]?.sellingPrice * item?.quantity}
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