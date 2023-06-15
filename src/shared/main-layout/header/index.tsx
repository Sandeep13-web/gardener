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
        {/* search header */}
        <div className="p-2 border-b-[1px] border-[#6071C60F]">
          <div className="container flex items-center justify-between gap-3">
            {/* Logo */}
            <Image
              src={Logo}
              width={150}
              height={81}
              quality={100}
              alt="Logo"
            />
            {/* Search */}
            <div className="border-[1px] border-[#E4E4E4] rounded-md h-[48px] !outline-offset-0 flex items-center justify-between gap-1">
              <input
                type="text"
                placeholder="Type here"
                className="input input-ghost w-full max-w-xs !shadow-none !outline-none"
              />
              <div className="divider divider-horizontal before:bg-[#E4E4E4] before:w-[1px] after:w-[1px] after:bg-[#E4E4E4] m-0 my-2"></div>
              <Dropdown data={["a", "b"]}>All Categories</Dropdown>
              <button className="rounded-l-none btn btn-primary rounded-r-md">
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
            <button className="relative btn btn-circle">
              <FlowerIcon />
              <Badge className="badge-accent" badgePosition="top-right">
                0
              </Badge>
            </button>
            {/* Total Price */}
            <div>
              <p className="text-[#555555] text-sm font-medium mb-1 whitespace-nowrap">
                TOTAL PRICE
              </p>
              <p className="text-[#222222] text-sm font-semibold">Rs. 1500</p>
            </div>
          </div>
        </div>
        {/* Category header */}
      </header>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="h-full p-4 menu w-80 bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={`border-b-[1px] sticky top-0 z-50 bg-white`}>
        <div className="container flex items-center justify-between">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-primary rounded-sm text-white capitalize flex justify-between flex-nowrap whitespace-nowrap min-w-[15rem]"
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
          <div className="flex items-center gap-2">
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
          <button className="btn btn-ghost !bg-white !border-0 text-text font-bold">
            <FlowerIcon className="text-2xl text-accent" />
            Offer
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
