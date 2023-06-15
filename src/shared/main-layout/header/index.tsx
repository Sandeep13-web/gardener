import Badge from "@/shared/components/badge";
import Button from "@/shared/components/button";
import Dropdown from "@/shared/components/dropdown";
import { Logo } from "@/shared/lib/image-config";
import Image from "next/image";
import React, { useState } from "react";
import { useScroll } from "framer-motion";
import FlowerIcon from "@/shared/icons/common/FlowerIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import CartIcon from "@/shared/icons/common/CartIcon";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import BarsIcon from "@/shared/icons/common/BarsIcon";

const Header = () => {
  return (
    <>
      <header>
        {/* location header */}
        <div className="relative z-10 bg-primary">
          <div className="container mx-auto">
            <div className="navbar bg-primary min-h-[48px] text-[12px]">
              <div className="flex-1">
                <p className="text-slate-50">Welcome to I am the Gardener !</p>
                <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0"></div>
                <div className="dropdown">
                  <label
                    tabIndex={0}
                    className="btn btn-link text-md text-[12px] p-0 text-white no-underline h-auto min-h-fit capitalize"
                  >
                    Outlet: Durbarmall
                  </label>
                  <ul
                    tabIndex={0}
                    className="p-2 mt-3 rounded-sm shadow menu dropdown-content bg-base-100 w-52"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-none">
                <button className="btn btn-link text-[12px] text-slate-50 no-underline h-auto min-h-fit p-0">
                  Login
                </button>
                <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0"></div>
                <button className="btn btn-link text-[12px] text-slate-50 no-underline h-auto min-h-fit p-0">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* search header */}
      <div className="p-2 border-b-[1px] border-[#6071C60F] bg-white sticky md:relative top-0 md:z-10 z-40">
        <div className="container flex items-center justify-between w-full gap-3">
          {/* Logo */}
          <Image src={Logo} width={150} height={81} quality={100} alt="Logo" />
          <div className="items-center justify-between flex-grow hidden md:flex ms-auto">
            {/* Search */}
            <div className="border-[1px] border-[#E4E4E4] rounded-md h-[48px] !outline-offset-0 flex items-center justify-between gap-1">
              <input
                type="text"
                placeholder="Type here"
                className="input input-ghost w-full max-w-xs !shadow-none !outline-none"
              />
              <div className="divider divider-horizontal before:bg-[#E4E4E4] before:w-[1px] after:w-[1px] after:bg-[#E4E4E4] m-0 my-2"></div>
              <Dropdown data={["a", "b"]}>All Categories</Dropdown>
              <button className="py-3 rounded-l-none btn btn-primary rounded-r-md">
                <SearchIcon />
              </button>
            </div>
            {/* Why Plant Button */}
            <button className="btn btn-primary btn-outline">
              <FlowerIcon /> <p className="hidden lg:block">Why Plant</p>
            </button>
            {/* Heart Button */}
            <button className="relative btn btn-circle">
              <FlowerIcon />
              <Badge
                className="badge-accent "
                type="primary"
                badgePosition="top-right"
              >
                0
              </Badge>
            </button>
            {/* Cart Button */}
          </div>
          <div className="flex items-center gap-3">
            {/* Cart */}
            <button className="relative btn btn-circle">
              <FlowerIcon />
              <Badge className="badge-accent" badgePosition="top-right">
                0
              </Badge>
            </button>

            {/* Total Price */}
            <div>
              <p className="text-[#555555] text-sm font-medium mb-1 whitespace-nowrap hidden md:block">
                TOTAL PRICE
              </p>
              <p className="text-[#222222] text-sm font-semibold whitespace-nowrap">
                NRP 1500
              </p>
            </div>
            {/* md: Drawer */}
            <div className="z-50 flex max-w-[8rem] drawer md:hidden">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer"
                  className="btn btn-ghost drawer-button"
                >
                  <BarsIcon />
                </label>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="h-full p-4 bg-white menu w-80 text-base-content">
                  {/* Sidebar content here */}
                  <li>
                    <a className="mb-3 text-white rounded-md bg-primary">
                      Location: Durbarmarg
                    </a>
                  </li>
                  <li>
                    <div className="p-0 border rounded-box !bg-white mb-3">
                      <input className="w-[14rem] py-0 m-0 !bg-transparent input" />
                      <button className="p-2 px-4 btn btn-primary btn-sm rounded-box">
                        <SearchIcon className="max-h-[1rem] max-w-[1rem]" />
                      </button>
                    </div>
                  </li>

                  <li className="border-b-[1px] border-primary ">
                    <p>Home</p>
                  </li>
                  <li className="border-b-[1px] border-primary">
                    <div
                      tabIndex={0}
                      className="max-w-[18rem] w-full p-2 px-3 pn-0 collapse collapse-plus "
                    >
                      <input type="checkbox" className="min-h-6 peer" />
                      <div className="font-medium collapse-title p-1 py-0 min-h-0 w-[17.5rem] flex items-center after:text-xl after:!-top-1">
                        <p>Out Services</p>
                      </div>
                      <div className="p-1 max-w-[17.5rem] min-w-0 collapse-content">
                        <p className="whitespace-normal  max-w-[17rem]">
                          tabIndex={0} attribute is necessary to make the div
                          focusable
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="border-b-[1px] border-primary ">
                    <p>Our Outlets</p>
                  </li>
                  <li className="border-b-[1px] border-primary">
                    <div
                      tabIndex={0}
                      className="max-w-[18rem] w-full p-2 px-3 pn-0 collapse collapse-plus "
                    >
                      <input type="checkbox" className="min-h-6 peer" />
                      <div className="font-medium collapse-title p-1 py-0 min-h-0 w-[17.5rem] flex items-center after:text-xl after:!-top-1">
                        <p>About Us</p>
                      </div>
                      <div className="p-1 max-w-[17.5rem] min-w-0 collapse-content">
                        <p className="whitespace-normal  max-w-[17rem]">
                          tabIndex={0} attribute is necessary to make the div
                          focusable
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="border-b-[1px] border-primary ">
                    <p>Blog</p>
                  </li>
                  <li>
                    Our Services
                    <button className="block btn btn-ghost text-start">
                      Why Plants
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Category header */}
      <div
        className={`border-b-[1px] relative md:sticky top-0 md:z-40 z-10 bg-white `}
      >
        <div className="container flex items-center justify-between">
          <div className="dropdown  md:min-w-[15rem] min-w-full">
            <label
              tabIndex={0}
              className="btn btn-primary rounded-sm text-white capitalize flex justify-between flex-nowrap whitespace-nowrap md:min-w-[15rem] min-h-[3rem] min-w-full"
            >
              <BarsIcon />
              All Categories <CaretDownIcon />
            </label>
            <ul
              tabIndex={0}
              className="w-full p-2 shadow dropdown-content menu bg-base-100"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div className="items-center hidden gap-2 md:flex">
            <Button
              type="ghost"
              className="!bg-white border-0 text-text font-bold"
            >
              Home
            </Button>
            <Dropdown
              data={["a", "b"]}
              toggleClassName="!font-bold btn-ghost text-text"
            >
              OUR SERVICE
            </Dropdown>
            <Button
              type="ghost"
              className="!bg-white border-0 text-text font-bold"
            >
              OUTLET
            </Button>
            <Dropdown
              data={["a", "b"]}
              toggleClassName="!font-bold btn-ghost text-text"
            >
              ABOUT US
            </Dropdown>
            <Button
              type="ghost"
              className="!bg-white border-0 text-text font-bold"
            >
              BLOGS
            </Button>
          </div>
          <button className="btn btn-ghost !bg-white !border-0 text-text font-bold hidden md:flex">
            <FlowerIcon className="text-2xl text-accent" />
            Offer
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
