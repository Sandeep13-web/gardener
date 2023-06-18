import Badge from "@/shared/components/badge";
import Button from "@/shared/components/button";
import Dropdown from "@/shared/components/dropdown";
import { Logo } from "@/shared/lib/image-config";
import Image from "next/image";
import FlowerIcon from "@/shared/icons/common/FlowerIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import BarsIcon from "@/shared/icons/common/BarsIcon";
import Drawer from "@/shared/components/drawer";
import { useQuery } from "@tanstack/react-query";
import { getConfig } from "@/services/home.service";
import OfferIcon from "@/shared/icons/common/OfferIcon";
import UserIcon from "@/shared/icons/common/UserIcon";
import CartIcon from "@/shared/icons/common/CartIcon";
import HeartIcon from "@/shared/icons/common/HeartIcon";

const Header = () => {

  const { data: config, isInitialLoading } = useQuery({ queryKey: ['getCategories'], queryFn: getConfig });

  console.log("config", config)
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
                <UserIcon className="text-white me-1" />
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
      <div className="p-2 border-b-[1px]  border-[#6071C60F] bg-white sticky md:static top-0 md:z-10 z-40 ">
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
            <button className="btn btn-primary btn-outline !min-h-12 font-bold text-base gap-0">
              <FlowerIcon /> <p className="hidden lg:block">Why Plant</p>
            </button>
          </div>
          <div className="flex items-center gap-3">
            {/* Heart Button */}
            <button className="relative hidden py-3 btn btn-circle md:flex">
              <HeartIcon className="text-black" />
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
              <CartIcon />
              <Badge className="badge-accent" badgePosition="top-right">
                0
              </Badge>
            </button>

            {/* Total Price */}
            <div>
              <p className="hidden mb-1 text-sm font-bold text-gray-600 text-gray-550 whitespace-nowrap md:block">
                TOTAL PRICE
              </p>
              <p className="text-[#222222] text-sm font-bold hidden xs:block whitespace-nowrap">
                NRP 1500
              </p>
            </div>
            {/* md:drawer */}
            <Drawer />
          </div>
        </div>
      </div>
      {/* Category header */}
      <div className={`border-b-[1px]  md:sticky top-0 md:z-70 z-10 bg-white `}>
        <div className="container flex items-center justify-between">
          <div className="flex w-full gap-10 md:w-auto">
            <div className="dropdown  md:min-w-[15rem] min-w-full">
              <label
                tabIndex={0}
                className="btn btn-primary rounded-sm font-bold text-white capitalize flex justify-between flex-nowrap whitespace-nowrap md:min-w-[15rem] min-h-[3rem] min-w-full"
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
                className="!bg-white border-0 text-text font-bold uppercase"
              >
                Home
              </Button>
              <Dropdown
                data={["Plant Consultation ", "Gift a plant "]}
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
                data={[
                  "Who We Are",
                  "Our Story",
                  "Values That Make Us Who We Are",
                  "Working At I Am The Gardner",
                  "Our CSR Project",
                ]}
                toggleClassName="!font-bold btn-ghost text-text"
              >
                ABOUT US
              </Dropdown>
              <Button
                type="ghost"
                className="!bg-white border-0 text-text font-bold uppercase"
              >
                BLOGS
              </Button>
            </div>
          </div>
          <button className="btn btn-ghost !bg-white !border-0 text-text gap-1 font-bold hidden md:flex">
            <OfferIcon className="text-accent" />
            OFFER
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
