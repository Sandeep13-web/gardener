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
import RecentProducts from "@/features/Home/recent";
import Plants from "@/features/Home/plants";

const Home: NextPageWithLayout = () => {
  return (
    <div className="text-lg font-bold min-h-[300vh]">
      <Banner />
      <div className="container mt-6">
        <div className="border border-[#f58220] rounded rounded-xs px-[20px]">
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
                className="text-[#253237] font-semibold text-normal capitalize leading-[22px] mb-0"
                text="Delivery Service"
                subTitle="Get plants delivered to your doorstep without hassle!"
                subClassName="leading-[20px] text-[#666] text-[13px]"
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
                className="text-[#253237] font-semibold text-normal capitalize leading-[22px] mb-0"
                text="100% Payment Secure"
                subTitle="Your payment are safe with us"
                subClassName="leading-[20px] text-[#666] text-[13px]"
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
                className="text-[#253237] font-semibold text-normal capitalize leading-[22px] mb-0"
                text="Support 10 Am - 6 Pm"
                subTitle="We are available all week from 10 Am to 6 Pm"
                subClassName="leading-[20px] text-[#666] text-[13px]"
                mb="0"
              />
            </div>
          </div>
        </div>
        <Categories />
        <RecentProducts />
        <Plants />
      </div>
    </div>
  );
};
export default Home;
Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};
