import BarsIcon from "@/shared/icons/common/BarsIcon";
import FlowerIcon from "@/shared/icons/common/FlowerIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import React from "react";

const Drawer = () => {
  return (
    <div className="z-50 flex max-w-[8rem] drawer md:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
          <BarsIcon />
        </label>
      </div>
      <div className=" drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="w-64 h-full p-4 bg-white menu text-base-content">
          <div className="relative">
            <label
              htmlFor="my-drawer"
              className=" drawer-end absolute p-3 rounded-sm -top-4 right-[-3rem] btn btn-error"
            >
              x
            </label>
          </div>
          {/* Sidebar content here */}
          <li>
            <a className="mb-3 text-white rounded-md bg-primary">
              Location: Durbarmarg
            </a>
          </li>
          <li>
            <div className="p-0 border rounded-box !bg-white mb-3 w-full flex">
              <input className=" py-0 m-0 pe-0 !bg-transparent input max-w-[10.5rem]" />
              <button className="p-2 px-4 btn btn-primary btn-sm rounded-box">
                <SearchIcon className="max-h-[1rem] max-w-[1rem]" />
              </button>
            </div>
          </li>
          <li>
            <div className="!bg-transparent block p-1">
              <p className="collapse-title">Home</p>
              <div className="collapse collapse-plus">
                <input type="checkbox" className="min-h-0" />
                <div className="collapse-title after:!top-0 after:!right-1 pe-4 after:text-lg">
                  Our Services
                </div>
                <div className="collapse-content">
                  <p className="collapse-text">Plant Consultant</p>
                  <p className="collapse-text">Gift a Plant</p>
                </div>
              </div>
              <p className="collapse-title">Out Outlets</p>
              <div className="collapse collapse-plus">
                <input type="checkbox" className="min-h-0" />
                <div className="collapse-title after:!top-0 after:!right-1 pe-4 after:text-lg">
                  About Us
                </div>
                <div className="collapse-content">
                  <p className="collapse-text">Who are we</p>
                  <p className="collapse-text">Our Story</p>
                  <p className="collapse-text">
                    Values that make us who we are{" "}
                  </p>
                  <p className="collapse-text">Our CSR Projects </p>
                </div>
              </div>
              <p className="collapse-title">Blog</p>
              <div className="mt-3">
                <p className="mb-2 text-base font-bold">Our Services</p>
                <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                  <FlowerIcon className="text-primary" />
                  Why Plants
                </button>
              </div>
              <div className="mt-6">
                <p className="mb-2 text-base font-bold">My Account</p>
                <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                  <FlowerIcon className="text-primary" />
                  Login / Sign Up
                </button>
                <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                  <FlowerIcon className="text-primary" />
                  Offer
                </button>
              </div>
            </div>
          </li>
          {/* <li className="border-b-[1px] border-primary ">
            <p>Home</p>
          </li>
          <li className="border-b-[1px] border-primary ">
            <p>Our Outlets</p>
          </li>
          <li className="border-b-[1px] border-primary ">
            <p>Blog</p>
          </li>
          <li>
            Our Services
            <button className="block btn btn-ghost text-start">
              Why Plants
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
