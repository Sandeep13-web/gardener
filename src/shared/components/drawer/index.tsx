import BarsIcon from "@/shared/icons/common/BarsIcon";
import FlowerIcon from "@/shared/icons/common/FlowerIcon";
import LocationIcon from "@/shared/icons/common/LocationIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import TagIcon from "@/shared/icons/common/TagIcon";
import UserIcon from "@/shared/icons/common/UserIcon";
import Link from "next/link";
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
              <LocationIcon />
              Location: Durbarmarg
            </a>
          </li>
          <li>
            <div className="p-0 border border-primary rounded-box !bg-white mb-3 w-full flex">
              <input
                placeholder="Search"
                className=" py-0 m-0 pe-0 !bg-transparent input max-w-[10.5rem]"
              />
              <button className="p-2 px-4 rounded-l-none -me-[1px] rounded-box btn btn-primary btn-sm">
                <SearchIcon className="max-h-[0.9rem] max-w-[0.9rem]" />
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
                  <p className="collapse-text"><Link href="/plant-consultation">Plant Consultant</Link></p>
                  <p className="collapse-text"><Link href="/gift-a-plant">Gift a Plant</Link></p>
                </div>
              </div>
              <p className="collapse-title">Out Outlets</p>
              <div className="collapse collapse-plus">
                <input type="checkbox" className="min-h-0" />
                <div className="collapse-title after:!top-0 after:!right-1 pe-4 after:text-lg">
                  About Us
                </div>
                <div className="collapse-content">
                  <p className="collapse-text"><Link href="/tree-installation">Tree Installation</Link></p>
                  <p className="collapse-text"><Link href="/about-us">Our Story</Link></p>
                  <p className="collapse-text">
                    <Link href="/our-values">
                    Values that make us who we are{" "}
                    </Link>
                  </p>
                  <p className="collapse-text"><Link href="/csr-projects">Our CSR Projects</Link> </p>
                </div>
              </div>
              <p className="collapse-title">Blog</p>
              <div className="mt-3">
                <p className="mb-2 text-base font-bold">Our Services</p>
                <Link href="/why-plants">
                  <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                    <FlowerIcon className="text-primary" />
                    Why Plants
                  </button>
                </Link>
              </div>
              <div className="mt-6">
                <p className="mb-2 text-base font-bold">My Account</p>
                
                <div className="flex">
                  <Link href="/login">
                    <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                      <UserIcon className="text-black" />
                      Login
                    </button>
                  </Link>
                  <span>/</span>
                  <Link href="/login">
                    <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                      Sign Up
                    </button>
                  </Link>
                </div>
                
                <Link href="/offer">
                <button className="flex block gap-1 p-0 text-base font-medium capitalize btn btn-ghost text-start">
                  <TagIcon className="text-black" />
                  Offer
                </button>
                </Link>
                
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
