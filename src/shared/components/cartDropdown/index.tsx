import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Badge from "../badge";
import CartIcon from "@/shared/icons/common/CartIcon";
import { CardImg } from "@/shared/lib/image-config";
import { useCart } from "@/store/use-cart";
import { FaTimes } from "react-icons/fa";

const CartDropdown = () => {
  const { cartItems, removeFromCart, calculateTotal } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMounted, setIsMounted] = useState(false);

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div className="relative z-40 py-3 dropdown dropdown-hover bg-gray-350 btn-circle shrink-0">
      <CartIcon className="mx-auto" />
      <Badge className="badge-accent" badgePosition="top-right">
        {totalQuantity}
      </Badge>
      {/* dropdown content */}
      <div
        tabIndex={0}
        className="dropdown-content right-0 z-[2] p-4 shadow bg-base-100 w-80"
      >
        {/* item list*/}
        <div className="max-h-42 overflow-auto [&>*:first-child]:pt-0">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="relative flex gap-2 pt-4 pb-4 border-b-2 border-solid border-gray-350"
            >
              <Link
                href={`${item.product.link}`}
                className="absolute w-full h-full"
              />
              <div className="w-[85px] aspect-square border-solid border-2 border-gray-350 relative">
                <Image
                  width={85}
                  height={85}
                  src={"/images/card-img.jpeg"} // Replace with the correct image source
                  alt="image"
                  className="object-contain aspect-square"
                />
                {item.quantity > 1 && (
                  <Badge
                    className="badge-accent left-1 top-1"
                    badgePosition="top-left"
                  >
                    {item.quantity}x
                  </Badge>
                )}
              </div>
              <div className="flex-grow">
                <h6 className="text-sm font-semibold ">{item.product.title}</h6>
                <p className="text-small">
                  <span>NPR</span>{" "}
                  {item.product.unitPrice[0].sellingPrice * item.quantity}
                </p>
              </div>
              <button
                className="absolute right-0 w-5 btn-circle btn-error btn aspect-square hover:bg-primary hover:border-primary"
                onClick={() => handleRemoveFromCart(item.product.id)}
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        {/* pricing list */}
        <div className="py-2">
          <p className="flex justify-between text-gray-450">
            Order Amount : <span>NPR {calculateTotal().subtotal}</span>
          </p>
          <p className="flex justify-between text-gray-450">
            Subtotal : <span>NPR {calculateTotal().subtotal}</span>
          </p>
          <p className="flex justify-between text-gray-450">
            Delivery charge : <span>NPR 0</span>
          </p>
          <p className="flex justify-between">
            Total : <span>NPR {calculateTotal().total}</span>
          </p>
        </div>
        <div className=" [&>*:first-child]:mb-4">
          <button className="py-4 font-normal btn btn-block rounded-3xl hover:bg-primary hover:text-white">
            CART
          </button>
          <button className="py-4 font-normal btn btn-block rounded-3xl hover:bg-primary hover:text-white ">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
