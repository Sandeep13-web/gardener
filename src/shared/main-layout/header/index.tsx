import Badge from "@/shared/components/badge";
import Button from "@/shared/components/button";
import Dropdown from "@/shared/components/dropdown";
import { Logo } from "@/shared/lib/image-config";
import Image from "next/image";
import FlowerIcon from "@/shared/icons/common/FlowerIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import BarsIcon from "@/shared/icons/common/BarsIcon";

const Header = () => {
  return (
    <>
      <header>
        {/* location header */}
        <div className="z-10 bg-primary">
          <div className="container mx-auto">
            <div className="navbar bg-primary min-h-[48px] text-[12px] flex-wrap flex-col sm:flex-row px-2">
              <div className="flex-1">
                <p className="text-slate-50">Welcome to I am the Gardener !</p>
                <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0 hidden sm:block"></div>
                <div className="hidden dropdown sm:block">
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
      <div className="p-2 border-b-[1px] border-[#6071C60F] bg-white sticky md:static top-0 md:z-10 z-40 ">
        <div className="container flex items-center justify-between w-full gap-3 max-h-12 sm:max-h-24">
          {/* Logo */}
          <div className="relative h-14 sm:h-20 w-36">
            <Image src={Logo} fill quality={100} alt="Logo" />
          </div>
          <div className="items-center justify-center flex-grow hidden gap-7 md:flex ms-auto">
            {/* Search */}
            <div className="border-[1px] border-[#E4E4E4] rounded-md h-[48px] !outline-offset-0 flex items-center justify-between gap-1 w-[60%]">
              <input
                type="text"
                placeholder="Search product."
                className="input input-ghost w-full max-w-xs !shadow-none !outline-none max-w-2xl"
              />
              <div className="divider divider-horizontal before:bg-[#E4E4E4] before:w-[1px] after:w-[1px] after:bg-[#E4E4E4] m-0 my-2"></div>
              <Dropdown data={["a", "b"]}>All Categories</Dropdown>
              <button className="py-3 rounded-l-none btn btn-primary rounded-r-md">
                <SearchIcon />
              </button>
            </div>
            {/* Why Plant Button */}
            <button className="btn btn-primary btn-outline !min-h-12 font-bold">
              <FlowerIcon /> <p className="hidden p-4 lg:block">Why Plant</p>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* Heart Button */}
            <button className="relative hidden py-3 btn btn-circle md:flex">
              <FlowerIcon />
              <Badge
                className="badge-accent "
                type="primary"
                badgePosition="top-right"
              >
                0
              </Badge>
            </button>
            {/* Cart */}
            <button className="relative py-3 btn btn-circle">
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
              <p className="text-[#222222] text-sm font-semibold hidden sm:block whitespace-nowrap">
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

                  <li className="border-b-[1px] border-primary ">
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
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Category header */}
      <div className={`border-b-[1px]  md:sticky top-0 md:z-70 z-10 bg-white `}>
        <div className="container flex items-center justify-between">
          <div className="flex w-full gap-5 md:w-auto">
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
