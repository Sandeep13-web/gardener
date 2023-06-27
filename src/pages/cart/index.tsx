import Link from "next/link";
import React, { useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import MainLayout from "@/shared/main-layout";
import Title from "@/shared/components/title";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/store/use-cart";

const Cart: NextPageWithLayout = () => {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart } =
    useCart();
  const [value, setValue] = useState<number>(1);
  const [addItem, setAddItem] = useState<boolean>(false);

  const addItemNum = (value: number) => {
    const addedItem = value + 1;
    setValue(addedItem);
  };
  const subItemNum = (value: number) => {
    if (value === 1) {
      setAddItem(false);
    } else if (value > 1) {
      const subItem = value - 1;
      setValue(subItem);
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (itemId: number, quantity: number) => {
    updateItemQuantity(itemId, quantity);
  };
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const calculateTotal = (): number => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item?.product?.unitPrice[0]?.sellingPrice * item.quantity;
    });
    return total;
  };
  return (
    <>
      <div className="product-page-banner">
        <div className="container">
          <h2 className="text-slate-850 text-[30px] capitalize font-semibold">
            Cart
          </h2>
          <div className="text-base breadcrumbs">
            <ul className="justify-center">
              <li>
                <Link
                  href="/"
                  className="text-slate-850 transition-all delay-150 duration-300 hover:!no-underline hover:text-primary"
                >
                  Home
                </Link>
              </li>
              {/* <li><Link href={'#'}>Documents</Link></li> */}
              <li className="text-slate-850">Cart</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container my-[60px]">
        <Title
          type=""
          className="text-2xl text-slate-850 font-semibold mb-[30px]"
          text="Your cart Items"
        />
        <div className="overflow-x-auto">
          <table className="table border cart-table border-gray-350">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Unit Price</th>
                <th>QTY</th>
                <th>Sub Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item?.product?.id} className="border-b-gray-350">
                  <td className="w-[150px] text-gray-650 text-center py-[30px] font-medium">
                    {/* <Link href={item.product.link} className="text-[15px]">
                      <img
                        src={item.product.images[0].imageName}
                        alt="Cart Image"
                        height={80}
                        width={80}
                      />
                    </Link> */}
                    <Image
                      src={"/images/card-img.jpeg"}
                      height={80}
                      width={80}
                      alt={item?.product?.title}
                    />
                  </td>
                  <td className="w-[435px] text-gray-650 text-center py-[30px] font-medium">
                    <Link href={`${item?.product?.link}`} className="text-[15px]">
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
                        className="text-base text-gray-650 p-[5px] border border-gray-350 transition-all delay-100 duration-150 hover:bg-slate-850 hover:text-primary"
                        onClick={() =>
                          handleUpdateQuantity(
                            item?.product.id,
                            item?.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="w-full text-base text-center border-y border-y-gray-350 focus:outline-0"
                        readOnly
                        value={item?.quantity}
                        maxLength={3}
                      />
                      <button
                        className="text-base text-gray-650 p-[5px] border border-gray-350 transition-all delay-100 duration-150 hover:bg-slate-850 hover:text-primary"
                        onClick={() =>
                          handleUpdateQuantity(
                            item?.product?.id,
                            item?.quantity + 1
                          )
                        }
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
                      onClick={() => handleRemoveFromCart(item?.product?.id)}
                    >
                      <FaTimes className="w-[15px]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row gap-[10px] items-start sm:items-center justify-between mt-[30px] mb-[60px]">
          <Link
            href="/"
            className="btn btn-tertiary font-bold px-[63px] py-[17px] rounded-[50px] text-slate-850 text-sm uppercase leading-[1] hover:btn-primary hover:text-white"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => clearCart()}
            className="btn btn-tertiary font-bold px-[63px] py-[17px] rounded-[50px] text-slate-850 text-sm uppercase leading-[1] hover:btn-primary hover:text-white"
          >
            Clear Shopping Cart
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-[40px] items-start justify-between mb-[60px]">
          <div className="checkout-card w-full sm:w-[370px]">
            <div className="checkout-card-header">
              <h4 className="inline-block text-lg pr-[18px] bg-slate-250 text-slate-850 relative font-bold z-[2] leading-[20px]">
                {" "}
                Use Coupon Code{" "}
              </h4>
            </div>
            <div className="mt-[20px]">
              <p className="text-sm mb-4 leading-[24px]">
                Enter your coupon code if you have one.
              </p>
              <form>
                <input
                  type="text"
                  className="bg-white border border-gray-350 h-[45px] mb-[30px] pl-2.5 w-full focus:outline-0"
                />
                <button className="btn btn-primary text-sm uppercase font-bold px-[42px] py-[13px] rounded-[50px] text-white">
                  Apply Coupon
                </button>
              </form>
            </div>
          </div>
          <div className="checkout-card">
            <div className="checkout-card-header">
              <h4 className="inline-block text-lg pr-[18px] bg-slate-250 text-slate-850 relative font-bold z-[2] leading-[20px]">
                Cart Total
              </h4>
            </div>
            <div className="flex items-center justify-between w-full mt-[36px] mb-[27px]">
              <p className="text-sm font-semibold">Total products</p>
              <p className="text-lg font-bold">
                NPR {calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mt-[36px] mb-[27px]">
              <p className="text-sm font-semibold">Subtotal</p>
              <p className="text-lg font-bold">
                NPR {calculateTotal().toFixed(2)}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mt-[36px] mb-[27px]">
              <p className="text-sm font-semibold">Delivery Charge</p>
              <p className="text-lg font-bold">NPR 0</p>
            </div>
            <div className="flex items-center justify-between w-full mb-[20px] text-primary">
              <p className="text-xl font-bold">Grand Total</p>
              <p className="text-xl font-bold">
                NPR {calculateTotal().toFixed(2)}
              </p>
            </div>
            <Link
              href={"/"}
              className="btn btn-primary text-sm uppercase font-bold px-[42px] py-[13px] rounded-[50px] text-white w-full"
            >
              Proceed To Checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

Cart.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
