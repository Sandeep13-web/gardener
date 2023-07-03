import MainLayout from "@/shared/main-layout";
import React from "react";
import { TiTick } from "react-icons/ti";

const Checkout = () => {
  return (
    <div>
      <div className="mt-[60px] mb-[40px]">
        <div className="container">
          <h3 className="mb-4 text-3xl font-bold">Your Order</h3>
          <p>
            Already have an account?
            <a className="text-primary cursor-pointer">Log in</a>
          </p>
          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-7 col-span-12">
              {/* Accordion Start */}
              <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-[rgba(0,0,0,.125)] mb-[16px]">
                <input type="radio" name="address" />
                <div className="collapse-title text-xl font-medium flex items-center justify-between border-none">
                  <div className="col-10 text-left">
                    <h5 className="text-[16px] font-semibold">
                      1. Personal Information
                    </h5>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text text-white">
                      <TiTick size={20} className=" bg-gray-650 rounded-full" />
                    </span>
                  </div>
                </div>
                <div className="collapse-content grid grid-cols-12  gap-4">
                  <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                      <span className="label-text">First Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your First Name"
                      name="f_name"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      First Name is required.
                    </p>
                  </div>

                  <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                      <span className="label-text">Contact</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Last Name"
                      name="l_name"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      Last Name is required.
                    </p>
                  </div>

                  <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                      <span className="label-text">Phone Number</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your Phone Number"
                      name="p_number"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      Phone Number is required
                    </p>
                  </div>

                  <div className="flex flex-col col-span-6 mb-[15px]">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Your Email"
                      name="p_number"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      Email is required
                    </p>
                  </div>

                  <div className="text-right col-span-12">
                    <button
                      type="submit"
                      className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-[rgba(0,0,0,.125)] mb-[16px]">
                <input type="radio" name="address" />
                <div className="collapse-title text-xl font-medium flex items-center justify-between border-none">
                  <div className="col-10 text-left">
                    <h5 className="text-[16px] font-semibold"> 2. Address </h5>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text text-white">
                      <TiTick size={20} className=" bg-gray-650 rounded-full" />
                    </span>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="flex flex-col mb-[15px]">
                    <label className="label">
                      <span className="label-text">Customer Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Customer Name"
                      name="username"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      Username is required.
                    </p>
                  </div>

                  <div className="flex flex-col mb-[15px]">
                    <label className="label">
                      <span className="label-text">Contact</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Contact Number"
                      name="contact"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      Contact number is required.
                    </p>
                  </div>

                  <div className="flex flex-col mb-[15px]">
                    <label className="label">
                      <span className="label-text">Address Title</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Contact Number"
                      name="address"
                      className="px-3.5 text-gray-650 h-[45px] w-full outline-0 text-sm border rounded-e"
                    />
                    <p className="text-error text-xs leading-[24px] mt-1">
                      Address is required.
                    </p>
                  </div>

                  <div className="text-right">
                    <button
                      type="submit"
                      className="bg-primary text-base-100 font-bold py-[10px] px-[22px] uppercase rounded-full hover:bg-slate-850"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>

              <div className="collapse collapse-arrow p-4 border-solid border-[1px] border-[rgba(0,0,0,.125)] mb-[16px]">
                <input type="radio" name="payment-method" />
                <div className="collapse-title text-xl font-medium flex items-center justify-between border-none">
                  <div className="col-10 text-left">
                    <h5 className="text-[16px] font-semibold">
                      2. Payment method
                    </h5>
                  </div>
                  <div className="col-2 text-right">
                    <span className="text text-white">
                      <TiTick size={20} className=" bg-gray-650 rounded-full" />
                    </span>
                  </div>
                </div>
                <div className="collapse-content">
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start ">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-primary w-[18px] h-[18px]"
                        checked
                      />
                      <div className="flex">
                        <img
                          alt="#"
                          src="https://assets.uat.ordering-iamthegardener-v4.ekbana.net/storage/payment/icon/6261881a94eee.png"
                          className="w-[30px] mx-3"
                        />
                        <span className="capitalize">e-sewa</span>
                      </div>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start ">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-primary w-[18px] h-[18px]"
                        checked
                      />
                      <div className="flex">
                        <img
                          alt=""
                          src="https://assets.uat.ordering-iamthegardener-v4.ekbana.net/storage/payment/icon/626188115d28e.png"
                          className="w-[30px] mx-3"
                        />
                        <span className="capitalize">cash on delivery</span>
                      </div>
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start ">
                      <input
                        type="radio"
                        name="radio-10"
                        className="radio checked:bg-primary w-[18px] h-[18px]"
                        checked
                      />
                      <div className="flex">
                        <img
                          alt=""
                          src="https://assets.uat.ordering-iamthegardener-v4.ekbana.net/storage/payment/icon/62618804c3d60.png"
                          className="w-[30px] mx-3"
                        />
                        <span>VISA MASTER &amp; Union Pay</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 col-span-12">
              <div className="py-[38px] px-[45px] bg-slate-150">
                <ul className="flex justify-between font-bold text-[16px] text-darkBlack">
                  <li>Product</li>
                  <li>Total</li>
                </ul>
                <div className="my-[29px] py-[18px] border-t-[1px]  border-b-[1px] border-light-gray border-solid">
                  <ul className="flex justify-between">
                    <li>
                      <span> In-house peace lily X 1 </span>
                    </li>
                    <li>
                      <span>NPR 750 </span>
                    </li>
                  </ul>
                </div>
                <ul className="flex justify-between">
                  <li className="font-semibold text-[16px] text-darkBlack">
                    Order Amount
                  </li>
                  <li className="text-[14px]">NPR 750</li>
                </ul>
                <ul className="flex justify-between">
                  <li className="font-semibold text-[16px] text-darkBlack">
                    Cart Subtotal
                  </li>
                  <li className="text-[14px]">NPR 750</li>
                </ul>
                <ul className="flex justify-between">
                  <li className="font-semibold text-[16px] text-darkBlack">
                    Delivery Charge
                  </li>
                  <li className="text-[14px]">NPR 150</li>
                </ul>
                <div className="mt-[18px] mb-[33px] py-[18px] border-t-[1px]  border-b-[1px] border-light-gray border-solid">
                  <ul className=" flex justify-between mb-[20px]">
                    <li className="font-bold text-[18px]">Total</li>
                    <li className="font-bold text-primary">NPR 900</li>
                  </ul>
                  <ul className="flex justify-between">
                    <li className="font-bold text-[18px]">Payment method</li>
                    <li className="font-bold text-[16px] text-gray-650">
                      {" "}
                      Cash On Delivery{" "}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-[25px]">
                <button className="font-bold text-base-100 py-[18px] px-[20px] uppercase rounded-full cursor-pointer bg-primary w-full hover:bg-darkBlack">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
Checkout.getLayout = (page: any) => {
  return <MainLayout>{page}</MainLayout>;
};
