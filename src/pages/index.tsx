import React from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/shared/main-layout";
import Title from "@/shared/components/title";
import {
  CardImg,
  CategoryImg,
  DeliveryImg,
  LockImg,
  CallImg,
} from "@/shared/lib/image-config";
import Image from "next/image";
import Banner from "@/shared/components/banner";
import Categories from "@/features/Home/categories";

import AppCategories from "@/features/Home/app-categories";
import { useQuery } from "@tanstack/react-query";
import { IAppCategories, IHome } from "@/interface/home.interface";
import SkeletonLoadingCard from "@/shared/components/skeleton/products";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
  const { data: home, isInitialLoading: homeLoading } = useQuery<IHome>({ queryKey: ['getHomeData'] });
  const { data: categories, isInitialLoading: loadingCategories }: any = useQuery({ queryKey: ['getCategories'] });

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
            categories={categories?.data.slice(0, 6)}
          />
          {homeLoading ?
            <>
              <div className="w-20 h-5 mx-4 mb-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((item, index) => (
                  <SkeletonLoadingCard
                    key={`app-skeleton-${index}`}
                  />
                ))}
              </div>
            </>
            :
            <>
              {home?.data?.appCategories.map((prev: IAppCategories, index: number) => (
                <AppCategories
                  key={`appcatgories-${index}`}
                  prev={prev}
                />
              )
              )}
            </>
          }
        </div>
      </div>
    </>
  );
};
export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
