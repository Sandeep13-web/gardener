import MainLayout from "@/shared/main-layout";
import Link from "next/link";
import React from "react";

const Review = () => {
  return (
    <>
      <div className="pb-[80px]">
        <div className="container">
          {/* Order Success */}
          <div className="max-w-[520px] mx-auto text-center mt-[20px]">
            <img className="mx-auto" src="images/order-success.svg" />
            <div>
              <h2 className="font-medium my-[30px] mb-[19px] text-[26px]">
                Order Has Been Placed Successfully
              </h2>
              <p className="text-black text-[18px]">
                Thank you for using I am the Gardener. Your request has been
                successfully placed.
              </p>
            </div>
            <div className="mt-[35px]">
              <Link
                href="/"
                className="bg-primary text-white inline-block font-bold tracking-wide leading-none py-[13px] px-[22px] text-center uppercase rounded-full hover:bg-slate-850 hover:text-base-100"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Fail */}
          <div className="max-w-[520px] mx-auto text-center mt-[20px]">
            <img className="mx-auto" src="images/payment-failed.png" />
            <div>
              <h2 className="font-medium my-[30px] mb-[19px] text-[26px]">  Payment Failed </h2>
              <p className="text-black text-[18px]">
              Your order has been placed but payment has been failed due to some error. Please contact I am the Gardener for more details.
              </p>
            </div>
            <div className="mt-[35px]">
              <Link
                href="/"
                className="bg-primary text-white inline-block font-bold tracking-wide leading-none py-[13px] px-[22px] text-center uppercase rounded-full hover:bg-slate-850 hover:text-base-100"
              >
              BACK TO HOMEPAGE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
Review.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
