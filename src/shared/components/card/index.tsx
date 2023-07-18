import React, { useEffect, useState } from "react";
import { Props } from "./card.props";
import Image from "next/image";
import Link from "next/link";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import TrashIcon from "@/shared/icons/common/TrashIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "@/services/cart.service";
import { ICartItem, ICreateCartItem, IUpdateCartItem } from "@/interface/cart.interface";
import ButtonLoader from "../btn-loading";
import { useCarts } from "@/hooks/cart.hooks";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useDebounce } from "@/hooks/useDebounce.hooks";

const Card: React.FC<Props> = ({ product, cartItem }) => {
  const { data: cart } = useQuery<ICartItem>(["getCart"]);
  const [value, setValue] = useState<number>(1);
  const stock: any = cartItem?.selectedUnit?.stock
  const queryClient = useQueryClient();
  const debounceSearchValue:any = useDebounce(value, 300)

  const { updateCartMutation, handleRemoveFromCart } = useCarts(); //customHook

  const handleAddToCart = () => {
    const payload: ICreateCartItem = {
      note: '',
      productId: product?.id,
      priceId: product?.unitPrice[0]?.id,
      quantity: value,
    }
    mutation.mutate(payload)
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, 'Item Added To Cart Successfully');
      queryClient.invalidateQueries(['getCart'])
    },
    onError: (error:any) => {
      showToast(TOAST_TYPES.error, error?.response?.data?.errors[0]?.message)
    }
  })
  const handleUpdateCart = (values: number) => {
    if (values <= stock) {
      const payload: IUpdateCartItem = {
        note: '',
        quantity: debounceSearchValue,
        product_number: cartItem?.id,
      }
      updateCartMutation.mutate(payload)
    } 

  };

  useEffect(() => {
    if(debounceSearchValue){
      handleUpdateCart(debounceSearchValue);
    }
  }, [debounceSearchValue])

  useEffect(() => {
    if(cartItem?.quantity){
      setValue(cartItem?.quantity)
    }
  }, [])
  

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
          width={216}
          height={270}
          quality={100}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </figure>
      <div className="plant-card_preview-icon">
        <Link
          href={`/products/${product?.slug}`}
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
          {(!(cart?.cartProducts?.some((item: any) => item?.product.id === product?.id))) ? (
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
          ): 
          cart?.cartProducts?.some((item: any) => item.product.id === product.id) && (
            <div className="flex items-center gap-3 px-3 border rounded-lg border-primary">
              {
                value === 1 ? 
                  <button onClick={()=> handleRemoveFromCart(cartItem?.id!)}>
                    <TrashIcon className="max-w-[14px] h-auto" />
                  </button>
                 : 
                <button
                  className="text-primary py-1 text-sm w-[14px]"
                  onClick={() => {setValue(value - 1)}}
                > - </button>
              }
              <input
                type="text"
                className="text-center max-w-[35px] h-full font-bold text-sm border-0 focus:outline-0 text-primary"
                value={value}
                readOnly
                maxLength={3}
              />
              <button
                className="text-primary py-1 w-[14px] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setValue(value + 1)}
                disabled={value === stock ? true : false}
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
