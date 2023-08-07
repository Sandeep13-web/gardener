import React from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/shared/main-layout";
import Title from "@/shared/components/title";
import {
  DeliveryImg,
  LockImg,
  CallImg,
  banner,
} from "@/shared/lib/image-config";
import Image from "next/image";
import Banner from "@/shared/components/banner";
import Categories from "@/features/Home/categories";

import AppCategories from "@/features/Home/app-categories";
import { useQuery } from "@tanstack/react-query";
import { IAppCategories, IHome } from "@/interface/home.interface";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Head from "next/head";
import { ICartItem } from "@/interface/cart.interface";
import { getCartData } from "@/services/cart.service";
import { useCart } from "@/store/use-cart";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  const { data: home, isInitialLoading: homeLoading } = useQuery<IHome>({
    queryKey: ["getHomeData"],
  });
  const { coupon } = useCart();
  const { data: cart } = useQuery<ICartItem>(['getCart'], () => getCartData({ coupon }))
  const { data: categories, isInitialLoading: loadingCategories }: any = useQuery({ queryKey: ['getCategoriesList'] });

  // useEffect(() => {
  //   if (!getCookie(CookieKeys.CARTNUMBER)) {
  //     setCartNumberCookie()
  //   }
  // }, [])
  const adBanners = home?.data?.adBanners || [];
  const totalAdBanners = adBanners.length;
  let displayedAdBanners = 0;

  return (
    <>
      <Head>
        <title>I am the Gardener</title>

      </Head>
      <div className="text-lg font-bold">
        <Banner />
        <div className="container my-6">
          <div className="border border-orange-450 rounded rounded-xs px-[20px]">
            <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 ">
              <div className="flex items-start px-[20px] py-[20px] md:py-[35px] relative gap-0">
                <Image
                  src={DeliveryImg}
                  alt="Static Image"
                  width={50}
                  height={50}
                  className="w-[45px] mr-[10px]"
                />
                <Title
                  type="title-section"
                  className="text-slate-850 font-semibold text-normal capitalize leading-[22px] mb-0"
                  text="Delivery Service"
                  subTitle="Get plants delivered to your doorstep without hassle!"
                  subClassName="leading-[20px] text-gray-650 font-normal text-[13px]"
                  mb="0"
                />
              </div>
              <div className="flex items-start  px-[20px] py-[20px] md:py-[35px] relative gap-0">
                <Image
                  src={LockImg}
                  alt="Static Image"
                  width={50}
                  height={50}
                  className="w-[45px] mr-[10px]"
                />
                <Title
                  type="title-section"
                  className="text-slate-850 font-semibold text-normal capitalize leading-[22px] mb-0"
                  text="100% Payment Secure"
                  subTitle="Your payment are safe with us"
                  subClassName="leading-[20px] text-gray-650 font-normal text-[13px]"
                  mb="0"
                />
              </div>
              <div className="flex items-start  px-[20px] py-[20px] md:py-[35px] relative gap-0">
                <Image
                  src={CallImg}
                  alt="Static Image"
                  width={50}
                  height={50}
                  className="w-[45px] mr-[10px]"
                />
                <Title
                  type="title-section"
                  className="text-slate-850 font-semibold text-normal capitalize leading-[22px] mb-0"
                  text="Support 10 Am - 6 Pm"
                  subTitle="We are available all week from 10 Am to 6 Pm"
                  subClassName="leading-[20px] text-gray-650 font-normal text-[13px]"
                  mb="0"
                />
              </div>
            </div>
          </div>
          <Categories
            loading={loadingCategories}
            categories={categories?.data}
          />
          <div className="grid grid-cols-12 gap-4 my-6">
            {adBanners.length > 0 &&
              adBanners?.slice(0, 2).map((bannerImg: any) => (
                <div className="col-span-12 overflow-hidden sm:col-span-6" key={bannerImg?.id}>
                  <Image
                    src={bannerImg?.webpWebImage ? bannerImg?.webpWebImage : bannerImg?.webImage}
                    alt={`bannerImage-${bannerImg?.id}`}
                    className="!h-full w-full transition-all duration-300 ease-linear translate hover:scale-[1.035]"
                    width={1000}
                    height={1000}
                    priority={true}
                    quality={100}
                    style={{
                      width: "100%",
                      height: "auto"
                    }}
                  />
                </div>
              ))
            }
          </div>

        </div>
        {homeLoading ?
          <div className="container my-6">
            <div className="w-20 h-5 mx-4 mb-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              {[1, 2, 3, 4, 5].map((index) => (
                <SkeletonLoadingCard
                  key={`app-skeleton-${index}`}
                />
              ))}
            </div>
          </div>
          :
          <>
            {home?.data?.appCategories?.map((prev: IAppCategories, index: number) => (
              <React.Fragment
                key={`appcatgories-${index}`}
              >
                <AppCategories
                  prev={prev}
                />
                {
                  index * 2 + 2 < home?.data?.adBanners.length &&
                  <div className="container">
                    <div className="grid grid-cols-12 gap-4 my-6">
                      {home?.data?.adBanners
                        .slice((index * 2) + 2, (index + 1) * 2 + 2) // Display 2 adBanners after each AppCategories set
                        .map((adBanner: any) => (
                          <div className="relative col-span-12 overflow-hidden sm:col-span-6" key={adBanner?.id}>
                            {/* {
                              adBanner?.linkType === 'Website' ? (
                                <Link className="absolute w-full h-full" target="_blank" href={`/${adBanner?.linkValue}`} />
                              ) : (
                                <Link className="absolute w-full h-full" href={
                                  adBanner?.linkType === 'Category' ? `/categories/${adBanner?.slug}`
                                    : `/product/${adBanner?.slug}`
                                } />
                              )
                            } */}
                            <Image
                              src={adBanner?.webpWebImage ? adBanner?.webpWebImage : adBanner?.webImage}
                              alt={`bannerImage-${adBanner?.id}`}
                              className="!h-full w-full transition-all duration-300 ease-linear translate hover:scale-[1.035]"
                              width={1000}
                              height={1000}
                              priority={true}
                              quality={100}
                              style={{
                                width: "100%",
                                height: "auto"
                              }}
                            />
                          </div>
                        ))}
                    </div>

                  </div>
                }
              </React.Fragment>
            )
            )}
          </>
        }
      </div>
    </>
  );
};
export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
