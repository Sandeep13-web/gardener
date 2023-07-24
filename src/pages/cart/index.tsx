import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from '../_app';
import MainLayout from '@/shared/main-layout';
import Title from '@/shared/components/title';
import { ICartItem } from '@/interface/cart.interface';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Head from 'next/head';
import CartTableRow from '@/features/Cart/cart-table-row';
import EmptyCart from '../../shared/components/empty-content/empty-cart';
import { useCarts } from '@/hooks/cart.hooks';
import ButtonLoader from '@/shared/components/btn-loading';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useCart as useCartStore } from '@/store/use-cart';
import { getCartData } from '@/services/cart.service';

enum COUPON_METHODS {
  ADD_COUPON = 'Apply Coupon',
  DELETE_COUPON = 'Remove Coupon',
}

const Cart: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const [tempCoupon, setTempCoupon] = useState('');
  const { setCoupon, coupon } = useCartStore();
  const [couponText, setCouponText] = useState<COUPON_METHODS>(COUPON_METHODS.ADD_COUPON);
  const { data: cart } = useQuery<ICartItem>(['getCart', coupon], () => getCartData({ coupon }));
  const { bulkCartDelete, bulkDeleteLoading } = useCarts();

  const clearCart = () => {
    bulkCartDelete.mutate();
  };

  const handleApplyCoupon = () => {
    setCoupon(tempCoupon);
    localStorage.setItem('coupon', coupon);
    setCouponText(COUPON_METHODS.DELETE_COUPON);
    queryClient.invalidateQueries(['getCart']);
  };
  const handleRemoveCoupon = () => {
    if (localStorage.getItem('coupon')) {
      localStorage.removeItem('coupon');
    }
    setCouponText(COUPON_METHODS.ADD_COUPON);
    setCoupon('');
    setTempCoupon('');
  };
  useEffect(() => {
    if (window && localStorage && localStorage.getItem('coupon')) {
      setCoupon(localStorage.getItem('coupon') as any);
    }
    if (localStorage.getItem('coupon')) {
      setCouponText(COUPON_METHODS.DELETE_COUPON);
    }
  }, [localStorage, window]);

  return (
    <>
      <Head>
        <title>I am the gardener | Cart</title>
      </Head>
      {cart?.cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="product-page-banner">
            <div className="container">
              <h2 className="text-slate-850 text-[30px] capitalize font-semibold">Cart</h2>
              <div className="text-base breadcrumbs">
                <ul className="justify-center">
                  <li>
                    <Link href="/" className="text-slate-850 transition-all delay-150 duration-300 hover:!no-underline hover:text-primary">
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
            <Title type="" className="text-2xl text-slate-850 font-semibold mb-[30px]" text="Your cart Items" />
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
                  {cart?.cartProducts?.map((item: any, index: number) => (
                    <CartTableRow item={item} key={index} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col sm:flex-row gap-[10px] items-start sm:items-center justify-between mt-[30px] mb-[60px]">
              <Link
                href="/"
                className="btn btn-tertiary font-bold px-[63px] py-[17px] rounded-[50px] text-slate-850 text-sm uppercase leading-[1] hover:btn-primary hover:text-white">
                Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                disabled={bulkDeleteLoading}
                className="btn btn-tertiary font-bold px-[63px] py-[17px] rounded-[50px] text-slate-850 text-sm uppercase leading-[1] hover:btn-primary hover:text-white">
                Clear Shopping Cart
                {bulkDeleteLoading && <ButtonLoader />}
              </button>
            </div>
            <div className="flex flex-col md:flex-row gap-[40px] items-start justify-between mb-[60px]">
              <div className="checkout-card w-full sm:w-[370px]">
                <div className="checkout-card-header">
                  <h4 className="inline-block text-lg pr-[18px] bg-slate-250 text-slate-850 relative font-bold z-[2] leading-[20px]">
                    Use Coupon Code
                  </h4>
                </div>
                <div className="mt-[20px]">
                  <p className="text-sm mb-4 leading-[24px]">Enter your coupon code if you have one.</p>
                  <form>
                    <input
                      type="text"
                      value={tempCoupon}
                      disabled={couponText === COUPON_METHODS.DELETE_COUPON ? true : false}
                      onChange={(e) => setTempCoupon(e.target.value)}
                      className="bg-white border border-gray-350 h-[45px] mb-[30px] pl-2.5 w-full focus:outline-0 disabled:opacity-70 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    />
                    {couponText === COUPON_METHODS.ADD_COUPON ? (
                      <button
                        onClick={handleApplyCoupon}
                        type="button"
                        disabled={tempCoupon === '' || tempCoupon === null}
                        className="btn btn-primary text-sm uppercase font-bold px-[42px] py-[13px] rounded-[50px] text-white">
                        {couponText}
                      </button>
                    ) : (
                      <button
                        onClick={handleRemoveCoupon}
                        type="button"
                        className="btn btn-primary text-sm uppercase font-bold px-[42px] py-[13px] rounded-[50px] text-white">
                        {couponText}
                      </button>
                    )}
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
                  <p className="text-lg font-bold">NPR {cart?.orderAmount}</p>
                </div>
                {/* {
                      coupon &&
                      <div className="flex items-center justify-between w-full mt-[36px] mb-[27px]">
                        <p className="text-sm font-semibold">Coupon Discount</p>
                        <p className="text-lg font-bold">
                          NPR {cart?.couponDiscount}
                        </p>
                      </div>
                    } */}
                <div className="flex items-center justify-between w-full mt-[36px] mb-[27px]">
                  <p className="text-sm font-semibold">Subtotal</p>
                  <p className="text-lg font-bold">NPR {cart?.subTotal}</p>
                </div>
                <div className="flex items-center justify-between w-full mt-[36px] mb-[27px]">
                  <p className="text-sm font-semibold">Delivery Charge</p>
                  <p className="text-lg font-bold">NPR {cart?.deliveryCharge}</p>
                </div>
                <div className="flex items-center justify-between w-full mb-[20px] text-primary">
                  <p className="text-xl font-bold">Grand Total</p>
                  <p className="text-xl font-bold">NPR {cart?.total}</p>
                </div>
                <Link
                  href={'/checkout'}
                  className="btn btn-primary text-sm uppercase font-bold px-[42px] py-[13px] rounded-[50px] text-white w-full">
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;

Cart.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
