import Badge from "@/shared/components/badge";
import Button from "@/shared/components/button";
import Dropdown from "@/shared/components/dropdown";
import { CardImg, Logo } from "@/shared/lib/image-config";
import Image from "next/image";
import FlowerIcon from "@/shared/icons/common/FlowerIcon";
import SearchIcon from "@/shared/icons/common/SearchIcon";
import CaretDownIcon from "@/shared/icons/common/CaretDownIcon";
import BarsIcon from "@/shared/icons/common/BarsIcon";
import Drawer from "@/shared/components/drawer";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getConfig, getHomeData, getProductCategory } from "@/services/home.service";
import OfferIcon from "@/shared/icons/common/OfferIcon";
import CartIcon from "@/shared/icons/common/CartIcon";
import HeartIcon from "@/shared/icons/common/HeartIcon";
import Link from "next/link";
import { getProfile } from "@/services/profile.service";
import { deleteCookie, getCookie } from "cookies-next";
import { FaChevronDown, FaUser } from "react-icons/fa";
import { IHome } from "@/interface/home.interface";
import { getToken } from "@/shared/utils/cookies-utils/cookies.utils";
import { logout } from "@/services/auth.service";
import { TOAST_TYPES, showToast } from "@/shared/utils/toast-utils/toast.utils";
import { useState } from "react";
import ConfirmationModal from "@/shared/components/confirmation-modal";

const Header = () => {

  const token = getToken();
  const [showModal, setShowModal] = useState<boolean>(false)
  const { data: config, isInitialLoading } = useQuery({
    queryKey: ["getConfig"],
    queryFn: getConfig,
  });

  const { data: home } = useQuery<IHome>({ queryKey: ['getHomeData'], queryFn: getHomeData });

  const { data: categories, isInitialLoading: loading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getProductCategory,
  });


  const { data: profile, isInitialLoading: loadingProfile } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getProfile,
    enabled: !!token
  })

  const queryClient = useQueryClient();
  const fetchData = async () => { };

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Logged out successfully")
      deleteCookie("token")
    }
  })

  const logoutHandler = () => {
    mutation.mutate()
    setShowModal(false)
  }
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
                      <p>Item 1</p>
                    </li>
                    <li>
                      <p>Item 2</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-none">
                <FaUser className="w-[13px] h-auto text-white me-2" />
                {
                  profile ?
                    <div className="dropdown dropdown-hover dropdown-end">
                      <label tabIndex={0} className="text-xs text-white py-1 m-1 px-0 capitalize bg-transparent border-0 hover:bg-transparent hover:transform hover:scale-[1.1] btn">
                        {profile?.data?.firstName}
                        <FaChevronDown />
                      </label>
                      <ul tabIndex={0} className="w-full min-w-[160px] py-2 px-3.5 shadow dropdown-content menu bg-base-100 top-[30px] z-[100]">
                        <li className="mx-5">
                          <Link
                            href={'/'}
                            className="text-xs text-gray-850 focus:bg-none focus:text-primary py-3 px-0 text-center font-semibold dropdown-item hover:transform hover:scale-[1.1] hover:px-0">
                            My Account
                          </Link>
                        </li>
                        <li className="mx-5 ">
                          <Link
                            href={'/'}
                            className="text-xs text-gray-850 focus:bg-none focus:text-primary py-3 px-0 text-center font-semibold dropdown-item hover:transform hover:scale-[1.1] hover:px-0">
                            Checkout
                          </Link>
                        </li>
                        <li className="mx-5 ">
                          <button
                            onClick={() => setShowModal(!showModal)}
                            className="!border-b-0 dropdown-item font-semibold text-xs text-gray-850 focus:bg-none focus:text-primary py-3 px-0 text-center hover:transform hover:scale-[1.1] hover:px-0">
                            Logout
                          </button>
                        </li>
                      </ul>
                      {
                        showModal && 
                        <ConfirmationModal
                          confirmHeading="Are you sure you want to logout?"
                          modalType="logout_modal"
                          btnName="Logout"
                          showModal={showModal}
                          btnFunction={logoutHandler}
                          cancelFuntion = {() => setShowModal(false)}
                          isLoading = {mutation.isLoading}
                        />
                      }
                    </div>
                    :
                    <div className="flex">
                      <Link
                        href={'/auth/login'}
                        className="btn btn-link text-[12px] text-slate-50 no-underline h-auto min-h-fit p-0 hover:no-underline hover:transform hover:scale-[1.1]">
                        Login
                      </Link>
                      <div className="divider divider-horizontal before:bg-white before:w-[1px] after:w-[1px] after:bg-white m-0"></div>
                      <Link href={'/auth/register'} className="btn btn-link text-[12px] text-slate-50 no-underline h-auto min-h-fit p-0 hover:no-underline hover:transform hover:scale-[1.1]">
                        Sign Up
                      </Link>
                    </div>
                }
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
            <Link href={"/"}>
              <Image src={Logo} fill quality={100} alt="Logo" />
            </Link>
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
            <button className="relative py-3 btn btn-circle ">
              <CartIcon />
              <Badge className="badge-accent" badgePosition="top-right">
                0
              </Badge>
            </button>
            <div className="relative z-40 py-3 dropdown dropdown-hover bg-gray-350 btn-circle shrink-0">
              <CartIcon className="mx-auto" />
              <Badge className="badge-accent" badgePosition="top-right">
                0
              </Badge>
              {/* dropdown content */}
              <div
                tabIndex={0}
                className="dropdown-content right-0 z-[2] p-4 shadow bg-base-100 w-80"
              >
                {/* item list*/}
                <div className="max-h-42 overflow-auto [&>*:first-child]:pt-0 ">
                  <div className="relative flex gap-2 pt-4 pb-4 border-b-2 border-solid border-gray-350">
                    <Link href="" className="absolute w-full h-full " />
                    <div className="w-[85px] aspect-square border-solid border-2 border-gray-350 relative">
                      <Image
                        width={85}
                        height={85}
                        src={CardImg}
                        alt="image"
                        className="object-contain aspect-square"
                      />
                      <Badge
                        className="badge-accent left-1 top-1"
                        badgePosition="top-left"
                      >
                        2x
                      </Badge>
                    </div>
                    <div className="flex-grow">
                      <h6 className="text-sm font-semibold ">Baby sun rose </h6>
                      <p className="text-small">
                        <span>NPR</span> 450
                      </p>
                    </div>
                    <button className="absolute right-0 w-5 btn-circle btn-error btn aspect-square hover:bg-primary hover:border-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* pricing list */}
                <div className="py-2 ">
                  <p className="flex justify-between text-gray-450">
                    Order Amount : <span>NPR 2700</span>
                  </p>
                  <p className="flex justify-between text-gray-450">
                    Subtotal : <span>NPR 2700</span>
                  </p>
                  <p className="flex justify-between text-gray-450">
                    Delievery charge : <span>NPR 100</span>
                  </p>
                  <p className="flex justify-between">
                    Total : <span>NPR 2800</span>
                  </p>
                </div>
                <div className=" [&>*:first-child]:mb-4">
                  <button className="py-4 font-normal btn btn-block rounded-3xl hover:bg-primary hover:text-white">
                    CART
                  </button>
                  <button className="py-4 font-normal btn btn-block rounded-3xl hover:bg-primary hover:text-white ">
                    CHECKOUT
                  </button>
                </div>
              </div>
            </div>

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
          </div >
        </div >
      </div >
      {/* Category header */}
      < div className={`border-b-[1px]  md:sticky top-0 md:z-70 z-10 bg-white `}>
        <div className="container flex items-center justify-between">
          <div className="flex w-full gap-10 md:w-auto">
            <div className="dropdown dropdown-hover  md:min-w-[15rem] min-w-full">
              <label
                tabIndex={0}
                className="btn btn-primary rounded-sm font-bold text-white capitalize flex justify-between flex-nowrap whitespace-nowrap md:min-w-[15rem] min-h-[3rem] min-w-full"
              >
                <BarsIcon />
                All Categories <CaretDownIcon />
              </label>
              <ul
                tabIndex={0}
                className="w-full p-0 shadow dropdown-content menu bg-base-100"
              >
                {categories?.data
                  ?.slice(0, 9)
                  .map((item: any, index: number) => (
                    <li key={`menu-${index}`}>
                      <Link
                        href={`/categories/${item.slug}`}
                        className="dropdown-item"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link href="/categories" className="dropdown-item">
                    + More categories
                  </Link>
                </li>
              </ul>
            </div>
            <div className="items-center hidden gap-2 md:flex">
              <Button
                type="ghost"
                className="!bg-white border-0 text-gray-550 font-bold uppercase"
              >
                Home
              </Button>
              <Dropdown
                data={["Plant Consultation ", "Gift a plant "]}
                toggleClassName="!font-bold btn-ghost text-gray-550"
              >
                OUR SERVICE
              </Dropdown>
              <Button
                type="ghost"
                className="!bg-white border-0 text-gray-550 font-bold"
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
                toggleClassName="!font-bold btn-ghost text-gray-550"
              >
                ABOUT US
              </Dropdown>
              <Button
                type="ghost"
                className="!bg-white border-0 text-gray-550 font-bold uppercase"
              >
                BLOGS
              </Button>
            </div>
          </div>
          <Link href="/offer">
            <button className="btn btn-ghost !bg-white !border-0 text-gray-550 gap-1 font-bold hidden md:flex">
              <OfferIcon className="text-accent" />
              OFFER
            </button>
          </Link>
        </div>
      </div >
    </>
  );
};

export default Header;
