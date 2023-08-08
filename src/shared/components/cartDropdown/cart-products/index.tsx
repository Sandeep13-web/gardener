import Link from 'next/link'
import React from 'react'
import Badge from '../../badge'
import Image from 'next/image'
import { useCarts } from '@/hooks/cart.hooks'
import { FaTimes } from 'react-icons/fa'

const CartDropdownProducts = ({ item }: any) => {
    const { cartDelete, handleRemoveFromCart, selectedId } = useCarts();
    //for checking sku units
    const selectedUnit = item?.selectedUnit;

    //used for finding the correct image to display according to selected id
    const selectedImg = item?.product?.webpImages ?
        item?.product?.webpImages.find((img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id))
        : item?.product?.images.find((img: any) => img?.unit_price_id === JSON.parse(selectedUnit?.id));

    //to display the offer price if the product has offer
    const checkOffer = item?.product?.variants?.find((price: any) => price?.hasOffer);

    return (
        <div key={item.product?.id} className="relative flex gap-4 py-[30px] border-b-2 border-solid border-gray-350">
            <div className="min-w-[85px] min-h-[100px] aspect-auto border-solid border-2 border-gray-350 relative">
                <Link href={`/products/${item.product?.slug}`} className="absolute w-full h-full" aria-label={`product-item-slug`} />
                <Image
                    width={85}
                    height={100}
                    style={{
                        width: 'auto',
                        height: 'auto'
                    }}
                    src={selectedImg ? selectedImg?.imageName : item?.product?.images[0]?.imageName}
                    alt="image"
                    className="object-contain min-w-[93px] max-w-[93px] min-h-[92px]"
                    crossOrigin="anonymous"
                />
                <Badge className="badge-primary left-1 top-1" badgePosition="top-left">
                    <span className="text-xs">{item.quantity}x</span>
                </Badge>
            </div>
            <div className="flex-grow">
                <Link
                    href={`/products/${item?.slug}`}
                    aria-label={`product-${item?.product?.id}`}
                    className="overflow-hidden capitalize text-sm font-semibold transition-all delay-150 duration-150 block text-ellipsis whitespace-nowrap max-w-[90%] hover:text-primary ">
                    {item?.product?.name}
                </Link>
                <p className="mt-1 text-sm gray-550">
                    {/* <span>NPR</span> {item?.product?.unitPrice[0].hasOffer ? item.product?.unitPrice[0]?.newPrice * item?.quantity : item.product?.unitPrice[0]?.sellingPrice * item?.quantity} */}
                    <span>NPR</span> {
                        checkOffer ? (checkOffer?.newPrice * item?.quantity) : (item?.selectedUnit?.sellingPrice * item?.quantity)
                    }
                </p>
            </div>
            <button
                className="absolute right-0 w-5 btn-circle btn-error btn aspect-square hover:bg-primary hover:border-primary"
                onClick={() => handleRemoveFromCart(item?.id)}
                disabled={selectedId === item?.id && cartDelete.isLoading}>
                {selectedId === item?.id && cartDelete.isLoading ? (
                    <span className="w-3 h-3 border-2 border-dotted rounded-full border-primary border-t-transparent animate-spin"></span>
                ) : (
                    <FaTimes className="w-3 h-3" />
                )}
            </button>
        </div>
    )
}

export default CartDropdownProducts