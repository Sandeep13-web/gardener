import React, { useState } from "react";
import { Props } from "./card.props";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import { useCart } from "@/store/use-cart";
import { IProduct } from "@/interface/product.interface";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, updateCart } from "@/services/cart.service";
import { ICartItem, ICreateCartItem, IUpdateCartItem } from "@/interface/cart.interface";
import ButtonLoader from "../btn-loading";

const Card: React.FC<Props> = ({ product, cartItem }) => {
  const { data: cart } = useQuery<ICartItem>(["getCart"]);
  const [value, setValue] = useState<number>(cartItem?.quantity || 1);
  const stock: any = cartItem?.selectedUnit?.stock
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['getCart'])
    }
  })

  const updateCartMutation = useMutation({
    mutationFn: updateCart,
    onSuccess: () => {
      queryClient.invalidateQueries(['getCart'])
    }
  })

  const handleAddToCart = () => {
    const payload: ICreateCartItem = {
      productId: product?.id,
      priceId: product?.id,
      quantity: value,
    }
    mutation.mutate(payload)
  };



  const handleUpdateCart = (values: number) => {
    if (values < stock) {
      setValue(values)
      const payload: IUpdateCartItem = {
        note: '',
        quantity: values,
        product_number: cartItem?.id,
      }
      updateCartMutation.mutate(payload)
    } else {
      console.log("erro", mutation.error)
    }

  };


  return (
    <div className="relative card plant-card">
      <Link
        href={`/products/${product?.slug}`}
        className="absolute top-0 bottom-0 left-0 right-0 z-[1]"
      />
      <figure>
        <Image
          src={product?.images[0]?.imageName}
          alt="Plant"
          className="w-full h-auto"
          width={100}
          height={0}
        />
      </figure>
      <div className="plant-card_preview-icon">
        <Link
          href={`/${product?.slug}`}
          className="flex items-center justify-center"
        >
          <SearchIcon className="max-w-[15px] h-auto" />
        </Link>
      </div>
      <div className="card-body px-[15px] py-[20px] gap-[10px]">
        <p className="text-xs uppercase text-gray-450">
          {product?.categoryTitle}
        </p>
        <h2 className="card-title plant-card-title">{product?.title}</h2>
        <p className="text-sm font-semibold text-primary">
          NPR {product?.unitPrice[0]?.sellingPrice}
        </p>

        <div className="flex justify-end relative z-[3]">
          {!(cart?.cartProducts?.some((item: any) => item?.product.id === product?.id)) && (
            <button
              className="btn btn-primary btn-outline p-2 h-auto !min-h-0 text-xs leading-auto"
              onClick={handleAddToCart}
              disabled={mutation.isLoading}
            >
              Add to Cart
              {
                mutation.isLoading &&
                <ButtonLoader />
              }
            </button>
          )}
          {cart?.cartProducts?.some((item: any) => item.product.id === product.id) && (
            <div className="flex items-center gap-3 px-3 border rounded rounded-lg border-primary">
              <button
                className="text-primary py-1 text-sm w-[14px]"
                onClick={() => handleUpdateCart(value - 1)}
              >
                {value === 1 ? (
                  <TrashIcon className="max-w-[14px] h-auto" />
                ) : (
                  "-"
                )}
              </button>
              <input
                type="text"
                className="text-center max-w-[35px] h-full font-bold text-sm border-0 focus:outline-0 text-primary"
                value={value}
                readOnly
                maxLength={3}
              />
              <button
                className="text-primary py-1 w-[14px]"
                onClick={() => handleUpdateCart(value + 1)}
              // disabled={value >= stock ? true : false}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div className='plant-card_cartBtn'>
                <Link href={'/'} className='font-bold underline uppercase bg-white text-slate-850 underline-offset-4 hover:textprimary'>Add to Cart</Link>
            </div> */}
    </div>
  );
};

export default Card;
