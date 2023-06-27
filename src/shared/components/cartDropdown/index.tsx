import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Badge from "../badge";
import CartIcon from "@/shared/icons/common/CartIcon";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { Props } from "./cartDropdown.props";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCartItemById } from "@/services/cart.service";

const CartDropdown: React.FC<Props> = ({ cart }) => {
  const token = getToken()
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const cartQuery = useQuery({queryKey:["getCart"] , enabled: !!token})

  const mutation = useMutation({
    mutationFn: deleteCartItemById,
    onSuccess: () => {
      cartQuery.refetch()
    }
  })
  const handleRemoveFromCart = (id:number) => {
    mutation.mutate(id)
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  
  return (
    <div className="relative z-40 py-3 cursor-pointer dropdown dropdown-hover bg-gray-350 btn-circle shrink-0">
      <CartIcon className="mx-auto" />
      <Badge className="badge-accent" badgePosition="top-right">
        {cart && token ? cart?.cartProducts?.length : 0}
      </Badge>
      {/* dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content min-w-[350px] right-0 z-[2] top-[100%] p-4 shadow bg-base-100"
      >
        {/* item list*/}
        <div className={`max-h-42 overflow-auto px-[30px] ${cart?.cartProducts?.length ===0 ? '' : 'pb-[30px]'}`}>
          {
            !cart || cart?.cartProducts?.length ===0 ?
              <p className="text-sm font-medium text-center text-slate-850">No Products in the cart.</p>
              :
              <>
                {
                  cart?.cartProducts?.map((item: any) => (
                    <div
                      key={item.product?.id}
                      className="relative flex gap-4 py-[30px] border-b-2 border-solid border-gray-350"
                    >
                      <div className="min-w-[85px] min-h-[100px] aspect-auto border-solid border-2 border-gray-350 relative">
                        <Link
                          href={`/products/${item.product?.slug}`}
                          className="absolute w-full h-full"
                        />
                        <Image
                          width={85}
                          height={100}
                          src={item?.product?.images[0]?.imageName}
                          alt="image"
                          className="object-contain aspect-auto"
                          crossOrigin="anonymous"
                        />
                        <Badge
                          className="badge-primary left-1 top-1"
                          badgePosition="top-left"
                        >
                          <span className="text-xs">{item.quantity}x</span>
                        </Badge>
                      </div>
                      <div className="flex-grow">
                        <Link href={`/products/${item.product?.slug}`}
                          className="overflow-hidden text-sm font-semibold transition-all delay-150 duration-150 block text-ellipsis whitespace-nowrap max-w-[90%] hover:text-primary ">{item.product?.title}</Link>
                        <p className="mt-1 text-sm gray-550">
                          <span>NPR</span>{" "}
                          {item.product?.unitPrice[0].sellingPrice * item.quantity}
                        </p>
                      </div>
                      <button
                        className="absolute right-0 w-5 btn-circle btn-error btn aspect-square hover:bg-primary hover:border-primary"
                        onClick={() => handleRemoveFromCart(item?.id)}
                      >
                        <FaTimes className="w-3 h-3" />
                      </button>
                    </div>
                  ))

                }
                {/* pricing list */}
                <div className="my-[25px]">
                  <p className="flex justify-between mb-1 font-medium text-gray-450">
                    Order Amount : <span>NPR {cart?.orderAmount}</span>
                  </p>
                  <p className="flex justify-between mb-1 font-medium text-gray-450">
                    Subtotal : <span>NPR {cart?.subTotal}</span>
                  </p>
                  <p className="flex justify-between mb-1 font-medium text-gray-450">
                    Delivery charge : <span>NPR {cart?.deliveryCharge}</span>
                  </p>
                  <p className="flex justify-between text-slate-850">
                    Total : <span>NPR {cart?.total}</span>
                  </p>
                </div>
                <div className=" [&>*:first-child]:mb-4">
                  <Link
                    href={'/cart'}
                    className="py-4 font-normal btn btn-block rounded-3xl hover:bg-primary hover:text-white"
                    onClick={() => router.push('/cart')}>
                    CART
                  </Link>
                  <Link
                    href={'/checkout'}
                    className="py-4 font-normal btn btn-block rounded-3xl hover:bg-primary hover:text-white "
                  >
                    CHECKOUT
                  </Link>
                </div>
              </>

          }
        </div>

      </div>
    </div>
  );
};

export default CartDropdown;
