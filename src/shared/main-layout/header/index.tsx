import Badge from "@/shared/components/badge";
import Button from "@/shared/components/button";
import Dropdown from "@/shared/components/dropdown";
import { Logo } from "@/shared/lib/image-config";
import FlowerIcon from "@/shared/ui/icons/common/FlowerIcon";
import Image from "next/image";
import React, { useState } from "react";
import { useScroll } from "framer-motion";

const Header = () => {
  return (
    <>
      <header>
        {/* location header */}
        <div className="bg-primary">
          <div className="container mx-auto">
            <div className="navbar bg-primary min-h-[48px] text-[12px]">
              <div className="flex-1">
                <p className="text-slate-50">Welcome to IamtheGardener!</p>
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
                    className="p-2 shadow menu dropdown-content bg-base-100 rounded-sm w-52 mt-3"
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
          <div className="container flex items-center justify-between">
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
              <Button type="primary" className="rounded-r-md rounded-l-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="#ffffff"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
                </svg>
              </Button>
            </div>
            {/* Why Plant Button */}
            <Button type="primary" outline icon={<FlowerIcon />}>
              Why Plant
            </Button>
            {/* Heart Button */}
            <Button
              type="circle"
              className="relative"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#555555"
                  viewBox="0 0 16 14"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              }
            >
              <Badge type="primary" badgePosition="top-right">
                0
              </Badge>
            </Button>
            {/* Cart Button */}
            <Button
              type="circle"
              className="relative"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#555555"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z" />{" "}
                </svg>
              }
            >
              <Badge type="accent" badgePosition="top-right">
                0
              </Badge>
            </Button>
            {/* Total Price */}
            <div>
              <p className="text-[#555555] text-sm font-medium mb-1">
                TOTAL PRICE
              </p>
              <p className="text-[#222222] text-sm font-semibold">Rs. 1500</p>
            </div>
          </div>
        </div>
        {/* Category header */}
      </header>
      <div className={`border-b-[1px] sticky top-0 z-50 bg-white p-4`}>
        <div className="container">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-primary m-1 text-white">
              All Categories
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <Button type="ghost" className="!bg-white border-0">
            Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
